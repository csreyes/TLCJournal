var mongoose = require('mongoose');

var GoalsSchema = new mongoose.Schema({
  entryId: { type: String, unique: true},
  description: String,
  motivation: String,
  startDate: String,
  setCompletionDate: String,
  completed: Boolean,
  completionDate: String
});

module.exports = mongoose.model('Goals', GoalsSchema);