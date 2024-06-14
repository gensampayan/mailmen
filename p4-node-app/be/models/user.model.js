import { Schema, model } from "mongoose";
import Joi from "joi";
import JoiObjectId from "joi-objectid";

Joi.objectId = JoiObjectId(Joi);

const userSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId
  },
  first_name: {
    type: String,
    maxlength: 50,
    required: true
  },
  last_name: {
    type: String,
    maxlength: 50,
    required: true
  },
  email_address: {
    type: String,
    maxlength: 255,
    unique: true,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 255,
    required: true
  },
}, { 
  timestamps: true 
});

const User = model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    first_name: Joi.string().max(50).required(),
    last_name: Joi.string().max(50).required(),
    email_address: Joi.string().email().max(255).required(),
    password: Joi.string().min(8).max(255).required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    lastLoginAt: Joi.date().optional(),
  });

  return schema.validate(user);
}

export { User, validateUser };
