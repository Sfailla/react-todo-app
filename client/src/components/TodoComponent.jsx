import React, { Component } from 'react'

import Icon25 from '../utils/SVGComponent'
import Authorize from '../utils/MyAuth'

import Todo from './Todo'


class TodoComponent extends Component {
    state = {
        todos: [],
        errors: [],
        todoText: '',
        completed: false,
    }

    Authorize = new Authorize()

    handleOnSubmit = (event) => {
        event.preventDefault()
        
        if (this.state.todoText !== '') {
            const option = event.target.elements.text.value.trim()
            const error = this.handleAddTodo(option)

            if (!error) {
                event.target.elements.text.value = ''
            }
        } else {
            console.log('empty input field')
            let errors = 'Please enter a Todo first'
            this.setState(() => ({ errors }))
        }
        
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
                        todos: [fetchData].concat([...prevState.todos])
                    }))
                })
            }).catch(err => console.log(err))
    }

    handleAddTodo = (option) => {
        this.Authorize.authFetch('/todos', {
            method: 'POST',
            body: JSON.stringify({ text: this.state.todoText })
        })
        .then(res => res.json())
        .then(todo => {
            return this.setState((prevState) => ({
                todos: [todo].concat([...prevState.todos])
            }))
        }).catch(err => console.log(err))
    }

    handleRemoveTodo = (id) => {
        this.Authorize.authFetch(`/todos/${id}`, { method: 'delete' })
            .then(res => res.json())
            .then(data => {
                return this.setState((prevState) => ({ 
                    todos: [...prevState.todos].filter((todo) => {
                        return todo._id !== id
                    })
                }))
            }).catch(err => console.log(err))
    }

    componentDidMount = () => {
        this.handleGetTodos()
    }

    render() {
        return (
            <div className="todo">
                {this.state.errorMessage && <h3>{this.state.errorMessage}</h3>}
                <form onSubmit={this.handleOnSubmit}>
                    <div className="todo__header">
                        <input className="todo__input"
                            autoComplete="off"
                            type="text"
                            name="text"
                            onChange={this.handleOnChange}
                            placeholder="please enter text" />
                        <button type="submit" className="todo__button">
                            <Icon25 icon="add" style={{fill: '#25b999' }} />
                        </button>
                    </div>
                </form>

                <div className="todo__container">
                    {this.state.errors.length > 0 && <p className="todo__error">{this.state.errors}</p>}
                    {!this.state.todos.length ? <p className="todo__title">Please enter a Todo to get started!</p> :
                    Array.isArray(this.state.todos) && 
                    this.state.todos.length && 
                    this.state.todos.map((todo, index) => (
                        <Todo key={todo._id} 
                            todo={todo.text} 
                            completed={todo.completed}
                            handleRemoveTodo={() => this.handleRemoveTodo(todo._id)} />
                        ))}
                </div>
            </div>
        )
    }
}

export default TodoComponent
