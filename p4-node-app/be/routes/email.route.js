import { 
  createEmail, 
  getAllEmail, 
  getEmailById, 
  updateEmail,
  deleteEmail 
} from "../controllers/email.controller.js";
import { Router } from "express";
import { asyncHandler } from "../middlewares/error.middleware.js";
import multer from "multer";
import { attachmentStorage} from "../config/storage.js";

const emailRouter = Router();
const emailStorage = multer({ attachmentStorage });

emailRouter.post("/compose", emailStorage.single("email-image"), asyncHandler(createEmail));
emailRouter.get("/", asyncHandler(getAllEmail));
emailRouter.get("/:emailId", asyncHandler(getEmailById));
emailRouter.put("/:emailId", asyncHandler(updateEmail));
emailRouter.delete("/:emailId", asyncHandler(deleteEmail));

export default emailRouter;
