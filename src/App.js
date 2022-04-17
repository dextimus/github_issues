import React, { Fragment, useCallback, useState } from 'react';
import Input from './components/Input/Input';
import IssuesList from './components/Issues/IssuesList';
import Button from './UI/Button/Button';
import LoadingSpinner from './UI/LoadingSpinner/LoadingSpinner';

function App() {
	const [enteredOwner, setEnteredOwner] = useState('');
	const [enteredRepo, setEnteredRepo] = useState('');
	const [issues, setIssues] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const ownerChangeHandler = ({ target: { value } }) => {
		setEnteredOwner(value);
	};

	const repoChangeHandler = ({ target: { value } }) => {
		setEnteredRepo(value);
	};

	const fetchIssuesHandler = useCallback(async () => {
		try {
			setIsLoading(true);
			const response = await fetch(
				`https://api.github.com/repos/${enteredOwner}/${enteredRepo}/issues`
			);

			const data = await response.json();

			const loadedReposData = [];
			for (const key in data) {
				loadedReposData.push({
					id: key,
					details: data[key].title,
				});
			}

			setIssues(loadedReposData);
		} catch (error) {
			setError('Something went wrong!');
		} finally {
			setIsLoading(false);
		}
	}, [enteredOwner, enteredRepo]);

	return (
		<Fragment>
			<h1>Issues Finder</h1>
			<section>
				<Input label="Enter Owner" changed={ownerChangeHandler} />
				<Input label="Enter Repo" changed={repoChangeHandler} />
				<Button action="Fetch Issues" clicked={fetchIssuesHandler} />
			</section>
			<section>
				{!isLoading && issues.length > 0 && <IssuesList issues={issues} />}
				{issues.length === 0 && <h2>No Issues</h2>}
				{isLoading && <LoadingSpinner />}
				{error}
			</section>
		</Fragment>
	);
}

export default App;
