const router = require("express").Router();
const notesRoute = require("./notes");

// User routes
// router.use("/user", userRoutes);
// Notes routes
router.use("/notes", notesRoute);

// module.exports = router;