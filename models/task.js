const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'In Progress',
  },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
