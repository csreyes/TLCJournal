var mongoose = require('mongoose');

var JournalEntriesSchema = new mongoose.Schema({
  entryId: { type: String, unique: true, index: true },
  date: Date,
  text: String,
  mode: String,
});

module.exports = mongoose.model('JournalEntries', JournalEntriesSchema);