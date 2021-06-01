const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: String,
  date_posted: {
    type: Date,
    default: Date.now
  },
  text: String
});

const Note = mongoose.model("Notes", NoteSchema);

module.exports = Note;