import { Email, validateEmail } from "../models/email.model.js";
import { User } from "../models/user.model.js";
import nodemailer from "nodemailer";
import moment from "moment"

const createEmail = async (req, res) => {
  const { sender, contact, subject, body } = req.body;
  const { path, filename } = req.file;

  const { error } = validateEmail(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const senderUser = await User.findOne({ email_address: sender });
  if (!senderUser) {
    return res.status(404).send("Can't find sender");
  }

  const newEmail = new Email({
    sender: senderUser.email_address, 
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

  transporter.sendMail({
    from: sender,
    to: contact,
    subject,
    text: body,
    attachments: [{
      path: newEmail.attachment.file_path,
      filename: newEmail.attachment.file_name
    }]
  });

  res.send(newEmail);
};

const getAllEmail = async (_, res) => {
  const emails = await Email.find()
    .select(["sender", "contact", "subject", "body", "createdAt"])
    .sort({ createdAt: -1 })

  if (!emails) {
    res.status(404).send("Emails not found.");
  }

  const formattedEmails = emails.map(email => ({
    sender: email.sender,
    contact: email.contact,
    subject: email.subject,
    body: email.body,
    createdAt: moment(email.createdAt).format('MMMM DD, YYYY, h:mm A')
  }));

  res.status(200).send({
    message: "List of emails.",
    data: formattedEmails
  });
}

const getEmailById = async (req, res) => {
  const { emailId } = req.params;

  const email = await Email.findById({ _id: emailId })
    .select(["sender", "contact", "subject", "body", "createdAt"])
  
  if (!email) {
    res.status(404).send("Email not found.");
  }

  const formattedEmail = {
    sender: email.sender,
    contact: email.contact,
    subject: email.subject,
    body: email.body,
    createdAt: moment(email.createdAt).format('MMMM DD, YYYY, h:mm A')
  };

  res.status(200).send({
    message: "Email found.",
    data: formattedEmail
  });
}

const updateEmail = async (req, res) => {
  const { emailId } = req.params;
  const { contact, subject, body, is_Draft } = req.body;

  const email = await Email.findOne({ _id: emailId }, { new: true });
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

const deleteEmail = async (req, res) => {
  const { emailId } = req.params;

  const email = await Email.findByIdAndDelete({ _id: emailId });

  if (!email) {
    res.status(404).send("Email not found.");
  }

  res.status(204).send({
    message: `Deleted email with ID ${email._id}`
  });
}

export { createEmail, getAllEmail, getEmailById, updateEmail, deleteEmail };
