import React, { Component } from 'react'

import Authorize from '../utils/MyAuth'

import TodoComponent from '../components/TodoComponent'
import DashboardComponent from '../components/DashboardComponent'


export default class Dashboard extends Component {
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

            // cannot figure out how to check for duplicates
            // I want it to check by sentence instead of every word

            // this.state.todos.map(todo => {
            //     let text = todo.text
            //     if (text.indexOf(option) === -1) {
            //         return console.log('unique option')
            //     } else if (text.indexOf(option) > -1) {
            //         return console.log('that option exists already')
            //     }
            // })

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

    handleLogOut = () => {
        this.Authorize.logout()
        setTimeout(() => { return this.props.history.push('/login') }, 250)
    }

    handleRemoveAll = () => {
        this.setState(() => ({ todos: [] }))
    }

    componentDidMount = () => {
        this.handleGetTodos()
    }

    render() {
        return (
            <div className="App-Layout dashboard"> 
                <div className="dashboard--left-box">
                    <TodoComponent
                        errors={this.state.errors}
                        todos={this.state.todos}
                        todoText={this.state.todoText}
                        completed={this.state.completed}
                        handleOnChange={this.handleOnChange}
                        handleOnSubmit={this.handleOnSubmit}
                        handleAddTodo={this.handleAddTodo}
                        handleGetTodos={this.handleGetTodos}
                        handleRemoveTodo={this.handleRemoveTodo}
                        handleRemoveAll={this.handleRemoveAll} />
                </div>
                <div className="dashboard--right-box">
                    <DashboardComponent
                        handleLogOut={this.handleLogOut} />
                </div>
            </div>
        )
    }
}
