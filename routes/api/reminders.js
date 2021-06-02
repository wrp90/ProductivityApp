const router = require("express").Router();
const remindersController = require("../../controllers/remindersController");

// Matches with "/api/reminders
router.route("/")
    .get(remindersController.findAll)
    .post(remindersController.create);

// Matches with "/api/reminders/:id"
router
    .route("/:id")
    .get(remindersController.findById)
    .put(remindersController.update)
    .delete(remindersController.remove);

module.exports = router;