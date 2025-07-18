const Joi = require('joi');

const todoSchema = Joi.object({
  text: Joi.string().min(1).max(100).required(),
  completed: Joi.boolean().optional()
});

const validateTodo = (req, res, next) => {
  const { error } = todoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: error.details[0].message 
    });
  }
  next();
};
// Create a separate validation for updates
const validateTodoUpdate = (req, res, next) => {
  const { error } = todoUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: error.details[0].message 
    });
  }
  next();
};

module.exports = {
  validateTodo,
  validateTodoUpdate 
};

