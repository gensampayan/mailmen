import { Email, validateEmail } from "../models/email.model.js";
import { User } from "../models/user.model.js";
import nodemailer from "nodemailer";
import moment from "moment";
import { verifyToken } from "../middlewares/auth.middleware.js";

const createEmail = async (req, res) => {
  const { contact, subject, body } = req.body;
  const userId = req.user.userId;

  const sender = await User.findById(userId);
  if (!sender) {
    return res.status(400).send("Invalid sender.");
  }

  let attachment = {};
  if (req.file) {
    attachment = {
      path: req.file.path,
      filename: req.file.filename
    };
  }

  const { error } = validateEmail({ sender: userId, contact, subject, body, attachment });
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const newEmail = new Email({
    sender: userId,
    contact,
    subject,
    body,
    attachment,
    is_Read: false,
    is_Draft: false
  });

  try {
    await newEmail.save();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: sender.email_address,
      to: contact,
      subject,
      text: body
    };

    if (req.file) {
      mailOptions.attachments = [{
        path: newEmail.attachment.path,
        filename: newEmail.attachment.filename
      }];
    }

    await transporter.sendMail(mailOptions);

    res.status(200).send(newEmail);
  } catch (error) {
    console.error("Error creating email:", error);
    res.status(500).send("Failed to create email.");
  }
};

const getAllEmail = async (_, res) => {
  const emails = await Email.find()
    .select(["sender", "contact", "subject", "body", "createdAt"])
    .sort({ createdAt: -1 });

  if (!emails) {
    return res.status(404).send("Emails not found.");
  }

  const formattedEmails = emails.map(email => ({
    sender: email.sender,
    contact: email.contact,
    subject: email.subject,
    body: email.body,
    createdAt: moment(email.createdAt).format('MMMM DD, YYYY h:mm A')
  }));

  res.status(200).send({
    message: "List of emails.",
    data: formattedEmails
  });
};

const getEmailById = async (req, res) => {
  const { emailId } = req.params;

  const email = await Email.findById(emailId)
    .select(["sender", "contact", "subject", "body", "createdAt"]);

  if (!email) {
    return res.status(404).send("Email not found.");
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
};

const updateEmail = async (req, res) => {
  const { emailId } = req.params;
  const { contact, subject, body, is_Draft } = req.body;

  const email = await Email.findById(emailId);
  if (!email) {
    return res.status(404).send("Email not found.");
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
};

const deleteEmail = async (req, res) => {
  const { emailId } = req.params;

  const email = await Email.findByIdAndDelete(emailId);

  if (!email) {
    return res.status(404).send("Email not found.");
  }

  res.status(204).send({
    message: `Deleted email with ID ${email._id}`
  });
};

export { createEmail, getAllEmail, getEmailById, updateEmail, deleteEmail };
