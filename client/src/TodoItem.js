import React from 'react';
import TaskBody from './TaskBody';

export default TodoItem = props => {

    const { isImportant, isComplete } = props.todoData;

    switch (props.filterType) {
        case 'All':
            return <>
                { !isComplete && <TaskBody { ...props } /> }
            </>
        case 'Important':
            return <>
                { !isComplete && isImportant && <TaskBody { ...props } /> } 
            </>
        case 'Completed':
            return <>
                { isComplete &&  <TaskBody { ...props } /> }
            </>
        default:
            return <TaskBody { ...props } />;
    }
}
