const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: string,
    start: Date,
    end: Date,
    allDay?: boolean,
    resource?: any,
  });

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;