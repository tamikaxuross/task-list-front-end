import PropTypes from 'prop-types';
import { useState } from 'react';
import Task from './Task.jsx';

const NewTaskForm = ( { onPostTask } ) => {
    const [taskText, setTaskText] =  useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (taskText.trim() === '') return;

        onPostTask(taskText);
        setTaskText('');
    };

    return (
        <form onSubmit={handleSubmit} className='new-task-form'>
            <input 
            type='text'
            placeholder='New Task'
            value={taskText}
            onChange={(event) => setTaskText(event.target.value)} 
            className='new-task-input'
            />
            
            <button type='submit' className='submit-button'>Add Task</button>
        </form>
    );
};

NewTaskForm.propTypes = {
    onPostTask: PropTypes.func.isRequired,
};

export default NewTaskForm;