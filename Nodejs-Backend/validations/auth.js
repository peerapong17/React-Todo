const Joi = require("joi");

const authSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),

  password: Joi.string()
    .min(6)
    .pattern(
      new RegExp(
        "^(?=.*[a-zA-Z]{3,})(?=.*[$@!%*?&.+#-])"
      )
    ),
});

module.exports = authSchema;
