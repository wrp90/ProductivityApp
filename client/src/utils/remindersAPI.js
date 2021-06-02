import axios from "axios";

export default {
  // Gets all reminders
  getReminders: function() {
    return axios.get("/api/reminders");
  },
  // Gets the reminder with the given id
  getReminder: function(id) {
    return axios.get("/api/reminders/" + id);
  },
  // Deletes the reminder with the given id
  deleteReminder: function(id) {
    return axios.delete("/api/reminders/" + id);
  },
  // Saves a reminder to the database
  saveReminder: function(reminderData) {
    return axios.post("/api/reminders", reminderData);
  }
};