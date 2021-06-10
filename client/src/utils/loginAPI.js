import axios from "axios";

export default {
  // Saves a user to the database
  newUser: function(userData) {
    return axios.post("/api/user", userData);
  },
  getUser: function(userData) {
      return axios.post("/api/user/login", userData)
  }
};