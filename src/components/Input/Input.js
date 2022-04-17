import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
  return (
    <div>
      <div className={classes.control}>
        <label htmlFor={props.id}>{props.label}</label>
        <input type='text' id={props.id} onChange={ props.changed}/>
      </div>
    </div>
  )
}

export default Input;