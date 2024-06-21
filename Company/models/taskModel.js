const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  companyId: {
    type: String,
    required: true
  },
  applicantId: {
    type: String, 
    required: true
  },
  taskId: {
    type: String,
    required: true,
    unique: true
  },
  taskTitle: {
    type: String,
    required: true
  },
  stipendAmount: {
    type: String,
    required: true
  },
  taskCategory: {
    type: String,
    required: true
  },
  requiredSkills: {
    type: [String],
    required: true
  },
  taskDescription: {
    type: String,
    maxlength: 500,
    required: true
  },
  responsibilities: {
    type: String,
    maxlength: 500,
    required: true
  },
  whoYouAre: {
    type: String,
    maxlength: 500,
    required: true
  },
  niceToHaves: {
    type: String,
    maxlength: 500,
    required: true
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
