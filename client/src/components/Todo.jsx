import React from 'react'
import PropTypes from 'prop-types'


const Todo = ({ todo, handleRemoveTodo }) => {
    return (
        <div className="todo__todo">
            <h3 className="todo__todoText">{todo}</h3>
            <button className="todo__remove" onClick={() => handleRemoveTodo(todo)}>remove</button>
        </div>
    )
}

Todo.propTypes = {
    todo: PropTypes.string,
    handleRemoveTodo: PropTypes.func
}

export default Todo