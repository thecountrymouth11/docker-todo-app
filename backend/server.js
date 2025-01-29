const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/todo', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const TodoSchema = new mongoose.Schema({ task: String });
const Todo = mongoose.model('Todo', TodoSchema);

app.get('/', async (req, res) => {
	const todos = await Todo.find();
	res.json(todos);
});

app.post('/add', async (req, res) => {
	const newTodo = new Todo({ task: req.body.task });
	await newTodo.save();
	res.send('Task added');
});

app.listen(3000, () => console.log('Server running on port 3000'));
