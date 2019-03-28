import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Subscribe } from 'unstated';
import TodoContainer from '../containers/TodoContainer'

interface Props {
    classes: any
}

const styles = (theme: any) => ({
    list: {
        height: 40
    },
});

class TodoList extends Component<Props> {
    handleToggleIsDone(container: TodoContainer, id: number) {
        return (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
            container.setIsDone(id, checked)
        }
    }

    handleDeleteTodo(container: TodoContainer, id: number) {
        return (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            container.deleteTodo(id)
        }
    }

    render() {
        return (
            <Subscribe to={[TodoContainer]}>
                {(container: TodoContainer) =>
                    <List>
                        {container.state.todos.map(todo => (
                            <ListItem key={todo.id} className={this.props.classes.list}>
                                <Checkbox
                                    checked={todo.isDone}
                                    onChange={this.handleToggleIsDone(container, todo.id)}
                                />
                                <ListItemText primary={todo.title} />
                                <IconButton onClick={this.handleDeleteTodo(container, todo.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                }
            </Subscribe>
        );
    }
}

export default withStyles(styles)(TodoList);