import { Schema, model } from "mongoose";
import Joi from "joi";
import JoiObjectId from "joi-objectid";

Joi.objectId = JoiObjectId(Joi);

const emailSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
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
    required: true
  },
  attachment: {
    path: {
      type: String,
    },
    filename: {
      type: String,
    }
  },
  is_Read: {
    type: Boolean,
  },
  is_Draft: {
    type: Boolean
  }
}, {
  timestamps: true
});

const Email = model("Email", emailSchema);

function validateEmail(email) {
  const schema = Joi.object({
    sender: Joi.objectId().required(),
    contact: Joi.string().max(255).required(),
    subject: Joi.string().max(255).required(),
    body: Joi.string().min(1).required(),
    attachment: Joi.object({
      path: Joi.string(),
      filename: Joi.string()
    }),
    is_Read: Joi.boolean(),
    is_Draft: Joi.boolean(),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
  });

  return schema.validate(email);
}

export { Email, validateEmail };
