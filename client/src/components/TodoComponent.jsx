import React from 'react'

import Icon25 from '../utils/SVGComponent'

import Todo from './Todo'


const TodoComponent = (props) => {
    return (
        <div className="todo">
            {props.errorMessage && <h3>{props.errorMessage}</h3>}
            <form onSubmit={props.handleOnSubmit}>
                <div className="todo__header">
                    <input className="todo__input"
                        autoComplete="off"
                        type="text"
                        name="text"
                        onChange={props.handleOnChange}
                        placeholder="please enter text" />
                    <button type="submit" className="circle-button todo__button">
                        <Icon25 icon="add" style={{fill: '#25b999' }} />
                    </button>
                </div>
            </form>

            <div className="todo__container">
                {props.errors.length > 0 && <p className="todo__error">{props.errors}</p>}
                {!props.todos.length ? <p className="todo__title">Please enter a Todo to get started!</p> :
                
                Array.isArray(props.todos) && 
                props.todos.length && 
                props.todos.map((todo, index) => (
                    <Todo key={todo._id} 
                            todo={todo.text} 
                            completed={todo.completed}
                            handleRemoveTodo={() => props.handleRemoveTodo(todo._id)} />
                    ))}
            </div>
        </div>
    )
}


export default TodoComponent
