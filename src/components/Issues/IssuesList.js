import React from 'react';
import Issue from './Issue';
import classes from './IssuesList.module.css';

const IssuesList = (props) => {
	return (
		<div>
			<h2>List of Issues</h2>
			<ul className={classes.issues}>
				{props.issues.map((repo) => (
					<Issue key={repo.id} name={repo.details} />
				))}
			</ul>
		</div>
	);
};

export default IssuesList;
