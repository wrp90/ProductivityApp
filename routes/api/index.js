const router = require("express").Router();
const notesRoute = require("./notes");
const remindersRoute = require("./reminders");
const eventsRoute = require("./event");
const userRoutes = require("./user")

// User routes
router.use("/user", userRoutes);
// Notes routes
router.use("/notes", notesRoute);
router.use("/reminders", remindersRoute);
router.use("/events", eventsRoute);

module.exports = router;