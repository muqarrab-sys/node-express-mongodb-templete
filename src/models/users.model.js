const Joi = require('joi');
const { Schema, model } = require('mongoose');

const userModel = model(
  'User',
  new Schema({
    firstName: { type: String, required: true, minLength: 3, maxLength: 50 },
    lastName: { type: String, required: true, minLength: 3, maxLength: 50 },
    email: { type: String, required: true, minLength: 5, maxLength: 255, unique: true },
    password: { type: String, required: true, minLength: 5, maxLength: 1024 },
    date: { type: Date, default: Date.now },
  }),
);

const userSchemaValidation = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(50).required(),
  lastName: Joi.string().alphanum().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(1024).required(),
  date: Joi.date(),
});

module.exports = { userModel, userSchemaValidation };
