const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());


app.use(bodyParser.json());

const url = 'mongodb+srv://task_manager:7CFJCAO8zfxwReb5@cluster0.tqnczob.mongodb.net/taskmanager'; // replace 'yourdatabase' with your actual database name

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));


// Create a task
app.post('/tasks', (req, res) => {
  const newTask = new Task(req.body);
  newTask.save()
    .then(task => {
      res.status(201).json(task);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});


// Get all tasks
app.get('/tasks', (req, res) => {
  Task.find({})
    .then(tasks => {
      res.status(200).json(tasks);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// Get a single task by id
app.get('/tasks/:id', (req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      if (task) {
        res.status(200).json(task);
      } else {
        res.status(404).send("No task found with the given ID");
      }
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        res.status(404).send("No task found with the given ID");
      } else {
        res.status(500).send(err);
      }
    });
});


// Update a task
app.put('/tasks/:id', (req, res) => {
  Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(task => {
      res.status(200).json(task);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  Task.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "Task successfully deleted" });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
