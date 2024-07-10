import { Mailbox } from "../models/mailbox.model.js";
import moment from 'moment';

const viewEmailsInMailbox = async (req, res) => {
  const { emailId } = req.params;

    const mailbox = await Mailbox.findOne({ emails: emailId })
      .populate({
        path: 'emails',
        match: { _id: emailId },
        select: ["sender", "contact", "subject", "body", "createdAt"]
      });

    if (!mailbox || mailbox.emails.length === 0) {
      return res.status(404).send("Email not found.");
    }

    const email = mailbox.emails[0];

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

export { viewEmailsInMailbox };
