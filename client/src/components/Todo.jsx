import React from 'react'
import PropTypes from 'prop-types'


const Todo = ({ todo, handleRemoveTodo }) => {
    return (
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <h3>{todo}</h3>
            <button onClick={() => handleRemoveTodo(todo)}>remove</button>
        </div>
    )
}

Todo.propTypes = {
    // todo: PropTypes.shape({
    //     text: PropTypes.string.isRequired,
    //     id: PropTypes.string.isRequired
    // }),
    handleRemoveTodo: PropTypes.func
}

export default Todo