import { viewEmailsInMailbox } from "../controllers/mailbox.controller.js";
import { asyncHandler } from "../middlewares/error.middleware.js";
import { Router } from "express";

const mailboxRouter = Router();


mailboxRouter.get("/:emailId", asyncHandler(viewEmailsInMailbox));

export {mailboxRouter};
