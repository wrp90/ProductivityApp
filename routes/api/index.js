const router = require("express").Router();
const userRoutes = require("./user");

// User routes
// router.use("/user", userRoutes);
// Notes routes
router.use("/notes", notesRoutes);

module.exports = router;