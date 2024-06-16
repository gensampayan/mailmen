import { ObjectId } from "bson";
import { Email, validateEmail } from "../models/email.model.js";
import { User } from "../models/user.model.js";
import nodemailer from "nodemailer";

const createEmail = async (req, res) => {
    const { sender_id, contact, subject, body } = req.body;
    const { path, filename } = req.file;

    const { error } = validateEmail(req.body);
    if (error) {
      console.error("Validation error:", error.details[0].message);
      return res.status(400).send(error.details[0].message);
    }

    const senderUser = await User.findOne({ email_address: sender_id });
    if (!senderUser) {
      return res.status(404).send("Can't find sender id");
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

    try {
      await newEmail.save();
    } catch (err) {
      console.error("Error saving email:", err);
      return res.status(500).send({ message: "Error saving email", error: err });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    try {
      const info = await transporter.sendMail({
        from: sender_id,
        to: contact,
        subject,
        text: body
      });

      console.log("Message sent: %s", info.messageId);
      res.send(newEmail);
    } catch (err) {
      console.error("Error sending email:", err);
      return res.status(500).send({ message: "Error sending email", error: err });
    }
};

export { createEmail };
