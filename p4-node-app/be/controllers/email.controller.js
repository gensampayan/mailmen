import { ObjectId } from "bson";
import { Email, validateEmail } from "../models/email.model.js";
import { User } from "../models/user.model.js";
import nodemailer from "nodemailer";

const createEmail = async (req, res) => {
    const { sender_id, contact, subject, body } = req.body;
    const { path, filename } = req.file;

    const { error } = validateEmail(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const senderUser = await User.findOne({ email_address: sender_id });
    if (!senderUser) {
      return res.status(404).send("Can't find sender");
    }

    const emailId = new ObjectId();
    const newEmail = new Email({
      email_id: emailId.toString(),
      sender_id: senderUser._id, 
      contact,
      subject,
      body,
      attachment: { path, filename },
      is_Read: false,
      is_Draft: false
    });

    await newEmail.save();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const info = await transporter.sendMail({
      from: sender_id,
      to: contact,
      subject,
      text: body
    });
  
    res.send(newEmail);
};

const updateEmail = async (req, res) => {
  const { id } = req.params;
  const { contact, subject, body, is_Draft } = req.body;

  const email = await Email.findOne({ email_id: id });
  if (!email) {
    res.status(404).send("Email not found.");
  }

  if (is_Draft) {
    if (contact !== undefined) email.contact = contact;
    if (subject !== undefined) email.subject = subject;
    if (body !== undefined) email.body = body;
    if (is_Draft !== undefined) email.is_Draft = is_Draft;
  
    await email.save();
  
    res.status(200).send({
        message: `Updated email with ID ${email._id}`,
        data: email,
    });
  } else {
    res.status(401).send("Something went wrong.")
  }
}

export { createEmail, updateEmail };
