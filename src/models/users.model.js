const { Schema, model } = require('mongoose');

const userModel = model(
  'User',
  new Schema({
    firstName: { type: String, required: true, minLength: 5, maxLength: 50 },
    lastName: { type: String, required: true, minLength: 5, maxLength: 50 },
    email: { type: String, required: true, minLength: 5, maxLength: 255, unique: true },
    password: { type: String, required: true, minLength: 5, maxLength: 1024 },
    date: { type: Date, default: Date.now },
  }),
);

module.exports = userModel;
