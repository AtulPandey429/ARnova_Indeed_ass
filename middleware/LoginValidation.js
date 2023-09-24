// validators.js
const Joi = require("joi");

// Define validation schema using Joi
const contactSchema = Joi.object({
  name: Joi.string().required(), // Validation for name
  email: Joi.string().email().required(),
  mobileNumber: Joi.string().min(10).required(), // Validation for mobile number
});

// Middleware function to validate contact data
function validateLoginData(req, res, next) {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next(); // Move to the next middleware or route handler
}

module.exports = {
  validateLoginData,
};
