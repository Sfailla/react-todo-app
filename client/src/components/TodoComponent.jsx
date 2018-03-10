import React, { Component } from 'react'

import Authorize from '../utils/MyAuth'


class TodoComponent extends Component {
    state = {
        todos: [],
        todoText: '',
        isCompleted: false
    }

    Authorize = new Authorize()

    handleOnChange = (event) => {
        const { value } = event.target
        
        this.setState(() => ({ todoText: value }))
    }

    handleAddTodo = (event) => {
        const { todoText } = this.state
        const { authFetch } = this.Authorize 

        authFetch('/todos', { 
            method: 'post', 
            body: JSON.stringify({ text: todoText }),
        })
        .then(res => res.json())
        .then(todo => {
            return this.setState((prevState) => ({
                todos: prevState.todos.concat([todo.text])
            }))
        })
    }

    handleGetTodos = () => {
        this.Authorize.authFetch('/todos', { method: 'GET' })
            .then(res => res.json())
            .then(todo => {
                const fetchTodos = todo.todos
                async function mapTodos(array) {
                    return await array.map(todo => {
                        return todo.text
                    })
                }
                mapTodos(fetchTodos)
                    .then(data => {
                        return this.setState((prevState) => ({
                            todos: prevState.todos.concat(data)
                        }))
                    })
            })
    }

    componentDidMount = () => {
        this.handleGetTodos()
    }

    render() {

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
                   {this.state.todos.length === 0 ? <h3 className="todo__title">Please enter a Todo to get started!</h3> :
                    this.state.todos.length && this.state.todos.map((todo, index) => {
                    return <Todo key={index} todo={todo} completed={!!this.state.isCompleted} />
                })}
            </div>
        )
    }
}

export default TodoComponent


export const Todo = (props) => {
    return (
        <div style={{display: 'flex', justifyContent: 'space-between' }}>
            <h3>{props.todo}</h3>
            <button>remove</button>
        </div>
    )
}



