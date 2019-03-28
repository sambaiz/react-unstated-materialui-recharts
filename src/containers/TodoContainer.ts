import { Container } from 'unstated';
import axios from 'axios'

export interface Todo { id: number, title: string, isDone: boolean }
interface TodoState { newTodo: string, todos: Todo[], isCreating: boolean }

class TodoContainer extends Container<TodoState> {
  state: TodoState = {
    newTodo: "",
    todos: [],
    isCreating: false
  };

  changeNewTodo(newTodo: string) {
    this.setState({ newTodo: newTodo });
  }

  async createTodo() {
    if (!this.canCreateTodo()) {
      return
    }
    this.setState({ isCreating: true });
    const newTodo = { title: this.state.newTodo, isDone: false }
    await axios.post<Todo[]>("http://localhost:3001/todo", newTodo)
    await this.loadTodo()
    this.setState({ newTodo: "", isCreating: false })
  }

  canCreateTodo() {
    return this.state.newTodo.length !== 0 && !this.state.isCreating
  }

  async setIsDone(id: number, status: boolean) {
    const target = this.state.todos.find((t) => t.id === id)
    if (target) {
      target.isDone = status
      await axios.put<Todo[]>(`http://localhost:3001/todo/${id}`, target)
      await this.loadTodo()
    }
  }

  async deleteTodo(id: number) {
    await axios.delete(`http://localhost:3001/todo/${id}`)
    await this.loadTodo()
  }

  async loadTodo() {
    const resp = await axios.get<Todo[]>("http://localhost:3001/todo")
    this.setState({ todos: resp.data })
  }
}

export default TodoContainer