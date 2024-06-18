import { Schema, model } from "mongoose";
import Joi from "joi";
import JoiObjectId from "joi-objectid";

Joi.objectId = JoiObjectId(Joi);

const emailSchema = new Schema({
  sender: {
    type: String,
    ref: "User",
    required: true
  },
  contact: {
    type: String,
    maxlength: 255,
    required: true
  },
  subject: {
    type: String,
    maxlength: 255,
    required: true
  },
  body: {
    type: String,
    minlength: 1,
    maxlength: 255,
    required: true
  },
  attachment: {
    file_name: {
      type: String,
    },
    file_path: {
      type: String,
    }
  },
  is_Read: {
    type: Boolean,  
  },
  is_Draft: {
    type: Boolean
  }
},
{ 
  timestamps: true 
});

const Email = model("Email", emailSchema);

function validateEmail(email) {
  const schema = Joi.object({
    sender: Joi.string().required(),
    contact: Joi.string().max(255).required(),
    subject: Joi.string().max(255).required(),
    body: Joi.string().min(1).max(255).required(),
    attachment: Joi.object({
      file_name: Joi.string(),
      file_path: Joi.string()
    }),
    is_Read: Joi.boolean(),
    is_Draft: Joi.boolean(),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
  });

  return schema.validate(email)
}

export { Email, validateEmail };
