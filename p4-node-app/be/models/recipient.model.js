import { Schema, model } from "mongoose";
import Joi from "joi";
import JoiObjectId from "joi-objectid";

Joi.objectId = JoiObjectId(Joi);

const recipientSchema = new Schema({
  email_id: {
    type: Schema.Types.ObjectId,
    ref: "Email",
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  recipient_type: {
    type: String,
    enum: ["To", "Cc", "Bcc"],
    required: true
  }
})

const Recipient = model("Recipient", recipientSchema);

function validateRecipient(recipient) {
  const schema = Joi.Object({
    email_id: Joi.objectId().required(),
    user_id: Joi.objectId().required(),
    recipient_type: Joi.string().valid("To", "Cc", "Bcc").required()
  })

  return Joi.validate(recipient, schema);
}

export { Recipient, validateRecipient };
