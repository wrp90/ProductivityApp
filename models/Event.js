const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: String,
    start: Date,
    end: Date,
    allDay: Boolean,
  });

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;