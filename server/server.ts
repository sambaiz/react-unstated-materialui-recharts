import * as express from "express";
import { Response, Request } from "express";
import * as cors from "cors";

const PORT = 3001
const app = express()
app.use(cors())
app.use(express.json())

interface Todo { id: number, title: string, isDone: boolean }
var nextId = 1
var todos: Todo[] = []

app.get('/todo', (req: Request, res: Response) => res.send(todos));

app.post('/todo', (req: Request, res: Response) => {
    if (typeof req.body.title !== 'string' || typeof req.body.isDone !== 'boolean') {
        return res.status(400).send('invalid data');
    }
    const newTodo = {
        id : nextId++,
        title: req.body.title,
        isDone: req.body.isDone
    }
    todos.push(newTodo)
    res.send(newTodo)
});

app.put('/todo/:id', (req: Request, res: Response) => {
    if (typeof req.body.title !== 'string' || typeof req.body.isDone !== 'boolean') {
        return res.status(400).send('invalid data');
    }
    const idx = todos.findIndex((el) => el.id == req.params.id)
    if (idx !== -1) {
        todos[idx] = Object.assign(todos[idx], {
            title: req.body.title,
            isDone: req.body.isDone
        })
    }
    res.send("ok")
});


app.delete('/todo/:id', (req: Request, res: Response) => {
    todos = todos.filter(t => t.id != req.params.id)
    return res.send("ok")
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});