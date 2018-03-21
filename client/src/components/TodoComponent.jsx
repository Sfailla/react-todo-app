import React from 'react'

import AlertComponent from '../utils/AlertComponent'
import Icon25 from '../utils/SVGComponent'

import Todo from './Todo'


const TodoComponent = (props) => {
    return (
        <div className="todo">            
            <form onSubmit={props.handleOnSubmit}>
                <div className="todo__header">
                    <input className="todo__input" autoComplete="off" type="text" name="text" 
                        onChange={props.handleOnChange}
                        placeholder="please enter text" />
                    <button type="submit" className="circle-button todo__button">
                        <Icon25 icon="add" />
                    </button>
                </div>
            </form>

            <div className="todo__container">
                {/* {props.errors.length ? <AlertComponent className={props.className} type="error" errors={props.errors} />
                 : null } */}
                {!props.todos.length ? <p className="todo__title">Please enter a Todo to get started!</p> :
                  props.todos.length && props.todos.map(todo => (
                    <Todo key={todo._id} 
                            todoText={todo.text}
                            todoID={todo._id}
                            completed={todo.completed}
                            handleCompletedTodos={props.handleCompletedTodos}
                            handleRemoveTodo={props.handleRemoveTodo} />
                    ))}
            </div>
        </div>
    )
}


export default TodoComponent
