import React from 'react'
import PropTypes from 'prop-types'

import Icon25 from '../utils/SVGComponent'

const Todo = ({ todo, handleRemoveTodo }) => {
    return (
        <div className="todo__todo">
            <p className="todo__todoText">{todo}</p>
        <div className="todo__button-container">
            <button className="todo__remove" onClick={() => handleRemoveTodo(todo)}>
                <Icon25 icon="trash" />
            </button>
            <button className="todo__completed">
                    <Icon25 icon="completed" className="todo__svg-completed" />
            </button>
        </div>
        </div>
    )
}

Todo.propTypes = {
    todo: PropTypes.string,
    handleRemoveTodo: PropTypes.func
}

export default Todo