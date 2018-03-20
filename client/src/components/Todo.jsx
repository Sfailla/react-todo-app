import React from 'react'
import PropTypes from 'prop-types'

import Icon25 from '../utils/SVGComponent'

const Todo = (props) => {
    return (
        <div className="todo__todo">
            <p className="todo__todoText">{props.todo}</p>
        <div className="todo__button-container">
            <button className="todo__remove" onClick={() => props.handleRemoveTodo(props.todo)}>
                <Icon25 icon="trash" />
            </button>
            <button className="todo__completed" onClick={() => props.handleCompletedTodos(props.todo)}>
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