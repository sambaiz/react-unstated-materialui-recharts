import React, { Component } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import DoneChart from './components/DoneChart';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Provider, Subscribe } from 'unstated';
import TodoContainer from './containers/TodoContainer'

export interface Todo { id: number, title: string, isDone: boolean }
interface State { newTodo: string, todos: Todo[], isCreating: boolean }

class Init extends Component<{ container: TodoContainer }> {
  componentDidMount() {
    this.props.container.loadTodo()
  }
  render() {
    return <div></div>
  }
}

class App extends Component<any, State> {
  render() {
    return (
      <Provider>
        <Subscribe to={[TodoContainer]}>{(container: TodoContainer) => <Init container={container}></Init>}</Subscribe>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">TODO</Typography>
          </Toolbar>
        </AppBar>
        <div className="App">
          <div className="Form"><TodoForm></TodoForm></div>
          <div className="Chart"><DoneChart></DoneChart></div>
          <TodoList></TodoList>
        </div>
      </Provider>
    );
  }
}

export default App;
