import { Schema, model } from "mongoose";
import Joi from "joi";
import JoiObjectId from "joi-objectid";

Joi.objectId = JoiObjectId(Joi);

const mailboxSchema = new Schema({
  mailbox_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    maxlength: 50,
    required: true
  },
  emails: [{
    type: String,
    ref: "Email"
  }]
},
{ 
  timestamps: true 
});

const Mailbox = model("Mailbox", mailboxSchema);

function validateMailbox(mailbox) {
  const schema = Joi.object({
    mailbox_id: Joi.objectId().required(),
    user_id: Joi.objectId().required(),
    name: Joi.string().max(50).required(),
    emails: Joi.array().items(Joi.string()),
    createdAt: Joi.date(),
    updatedAt: Joi.date()
  });

  return schema.validate(mailbox, schema);
}

export { Mailbox, validateMailbox };
