const express = require("express");
const router = express.Router();
const todo = require("../controller/Todo");
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  todo.getTodos
);

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  todo.createTodo
);

router.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  todo.updateTodo
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  todo.deleteTodo
);

module.exports = router;
