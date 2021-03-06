import React, { Component } from 'react';
import '../App.css';
import Typography from '@material-ui/core/Typography';

import Form from './Form';
import List from './List';


class App extends Component {

  state = {
    inputValue: "",
    todos: []
  }

  componentDidMount() {
  fetch('https://jsonplaceholder.typicode.com/todos/') 
    .then(response => response.json()) 
    .then(data => this.setState({ 
      todos: data 
    })) 
  }

  handleChange = (e) => {
    this.setState({
        inputValue: e.target.value
    })
  }

  handleIsDone = (index) => {
    const todos = this.state.todos.slice();
    todos[index].completed = !todos[index].completed;
    this.setState({todos: todos})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newTodos = this.state.todos.slice();
    if(this.state.inputValue){
    const newTodo = {
      userId: 1,
      id: newTodos.length,
      title: this.state.inputValue,
      completed: false
    };
    newTodos.push(newTodo);
    this.setState({
      todos: newTodos,
      inputValue: ''
    })
  }
}

  handleRemoveItem = (index) => {
    const newListWithoutRemovedItems = this.state.todos.slice();
    newListWithoutRemovedItems.splice(index, 1);
    this.setState({
      todos: newListWithoutRemovedItems
    })
  }

  render() {
    return (
      <div className="App" id="main">
        <Typography variant="display2" gutterBottom>
            A Simple Todo List
      </Typography>
        <Form 
          handleChange = {this.handleChange}
          inputValue = {this.state.inputValue}  
          handleSubmit={this.handleSubmit}
        /> 
        <List 
          todos={this.state.todos}
          handleIsDone={this.handleIsDone}
          handleRemoveItem={this.handleRemoveItem}
        />
      </div>
    );
  }
}

export default App;
