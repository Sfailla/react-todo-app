import React, { Component } from 'react'

import Todo from './Todo'
import Authorize from '../utils/MyAuth'


class TodoComponent extends Component {
    state = {
        todos: [],
        errors: [],
        todoText: '',
        completed: false,
    }

    Authorize = new Authorize()

    handleOnChange = (event) => {
        const { value } = event.target
        this.setState(() => ({ todoText: value }))
    }

    handleAddTodo = () => {
        const { todoText } = this.state

        this.Authorize.authFetch('/todos', { 
            method: 'post', 
            body: JSON.stringify({ text: todoText }),
        })
        .then(res => res.json())
        .then(async todo => {
            return await this.setState(() => ({
                todos: this.state.todos.concat([todo])
            }))
        })
    }

    handleGetTodos = () => {
        this.Authorize.authFetch('/todos', { method: 'GET' })
            .then(res => res.json())
            .then(async todo => {
                const fetchTodos = todo.todos 
                return await fetchTodos.map(fetchData => {
                    return this.setState((prevState) => ({
                        todos: prevState.todos.concat([fetchData])
                    }))
                })
        })
    }

    handleRemoveTodo = (id) => {
        this.Authorize.authFetch(`/todos/${id}`, { method: 'delete' })
            .then(res => res.json())
            .then(async data => {
                return await this.setState((prevState) => ({ 
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

        // console.log(this.state.todos)

        return (
            <div className="todo">
                <div style={{ display: 'flex', alignItems: 'center' }} className="todo__form-group">
                    <input className="todo__input"
                        style={{ height: '3rem', width: '100%', marginBottom: '2rem' }}
                        type="text"
                        value={this.state.todoText}
                        name="text"
                        onChange={this.handleOnChange}
                        placeholder="please enter todo here" />
                    <button style={{marginBottom: '2rem', height: '3rem'}} onClick={this.handleAddTodo}>Submit</button>
                </div>

        {!this.state.todos.length ? 
            <h3 className="todo__title">Please enter a Todo to get started!</h3> :
            Array.isArray(this.state.todos) && this.state.todos.length 
            && this.state.todos.map((todo, index) => {  
            return (
                <Todo 
                    key={index} 
                    todo={todo.text}
                    handleRemoveTodo={() => this.handleRemoveTodo(todo._id)} 
                    completed={todo.completed} /> 
                )})} 
            </div>
        )
    }
}

export default TodoComponent
