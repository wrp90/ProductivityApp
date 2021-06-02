const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReminderSchema = new Schema({
  title: String,
  date_posted: {
    type: Date,
    default: Date.now
  },
  text: String
});

const Reminder = mongoose.model("Reminders", ReminderSchema);

module.exports = Reminder;