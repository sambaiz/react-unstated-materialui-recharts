import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Subscribe } from 'unstated';
import TodoContainer from '../containers/TodoContainer'

class TodoForm extends Component {
    handleChangeNewTodo(container: TodoContainer) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            container.changeNewTodo(e.target.value)
        }
    }

    handleCreateTodo(container: TodoContainer) {
        return (e: React.FormEvent<HTMLFormElement>) => {
            container.createTodo()
            e.preventDefault()
        }
    }

    render() {
        return (
            <Subscribe to={[TodoContainer]}>
                {(container: TodoContainer) =>
                    <form onSubmit={this.handleCreateTodo(container)} noValidate autoComplete="off">
                        <div>
                            <TextField
                                id="todo"
                                label="Todo"
                                value={container.state.newTodo}
                                onChange={this.handleChangeNewTodo(container)}
                                margin="normal"
                                disabled={container.state.isCreating}
                            />
                        </div>
                        <div>
                            <Button type="submit" variant="outlined" color="primary" disabled={!container.canCreateTodo()}>
                                Add
                            </Button>
                        </div>
                    </form>
                }
            </Subscribe>
        );
    }
}

export default TodoForm;
