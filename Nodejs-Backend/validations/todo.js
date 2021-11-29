const Joi = require("joi");

const todoSchema = Joi.object({
  task: Joi.string().alphanum().min(6).required(),

  isCompleted: Joi.boolean(),
});

module.exports = todoSchema;
