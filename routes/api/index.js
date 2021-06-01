const router = require("express").Router();
const notesRoute = require("./notes");
// const userRoutes = require("./user")

// User routes
// router.use("/user", userRoutes);
// Notes routes
router.use("/notes", notesRoute);

module.exports = router;