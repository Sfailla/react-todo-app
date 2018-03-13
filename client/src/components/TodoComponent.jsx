import React, { Component } from 'react'

import Todo from './Todo'
import Authorize from '../utils/MyAuth'


class TodoComponent extends Component {
    state = {
        todos: [],
        error: [],
        todoText: '',
        completed: false,
    }

    Authorize = new Authorize()

    handleOnSubmit = (event) => {
        event.preventDefault()

        const option = event.target.elements.text.value.trim()
        const error = this.handleAddTodo(option)

        if (!error) {
            event.target.elements.text.value = ''
        }  
        // this.setState(() => ({ error }))
    }

    handleOnChange = (event) => {
        const { value } = event.target
        this.setState(() => ({ todoText: value }))
    }

    handleGetTodos = () => {
        this.Authorize.authFetch('/todos', { method: 'GET' })
            .then(res => res.json())
            .then(todo => {
                const fetchTodos = todo.todos
                return fetchTodos.map(fetchData => {
                    return this.setState((prevState) => ({
                        todos: prevState.todos.concat([fetchData])
                    }))
                })
            })
    }

    handleAddTodo = (option) => {         
        this.Authorize.authFetch('/todos', { 
            method: 'post', 
            body: JSON.stringify({ text: this.state.todoText }),
        })
        .then(res => res.json())
        .then(todo => {
            return this.setState((prevState) => ({
                todos: prevState.todos.concat([todo])
            }))
        })
    }

    handleRemoveTodo = (id) => {
        this.Authorize.authFetch(`/todos/${id}`, { method: 'delete' })
            .then(res => res.json())
            .then(data => {
                return this.setState((prevState) => ({ 
                    todos: prevState.todos.filter((todo) => {
                        return todo._id !== id
                    }) 
                }))
            })
    }

    componentDidMount = () => {
        this.handleGetTodos()
    }

    render() {
        return (
            <div className="todo">
                {this.state.errorMessage && <h3>{this.state.errorMessage}</h3>}
                
                <form onSubmit={this.handleOnSubmit}>
                    <div className="todo__form-group">
                        <input className="todo__input"
                            autoComplete="off"
                            type="text"
                            name="text"
                            onChange={this.handleOnChange}
                            placeholder="please enter text" />
                        <button type="submit" className="todo__button">+</button>
                    </div>
                </form>

                <div className="todo__container">
                    {!this.state.todos.length ? <h3 className="todo__title">Please enter a Todo to get started!</h3> :
                    Array.isArray(this.state.todos) && this.state.todos.length
                    && this.state.todos.map((todo, index) => {
                        return (
                        <Todo key={index} 
                            todo={todo.text} 
                            handleRemoveTodo={() => this.handleRemoveTodo(todo._id)}
                            completed={todo.completed} />
                        )
                    })}
                </div> 
            </div>
        )
    }
}

export default TodoComponent
