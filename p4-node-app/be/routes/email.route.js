import { 
  createEmail, 
  getAllEmail, 
  getEmailById, 
  updateEmail,
  deleteEmail 
} from "../controllers/email.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js"
import { Router } from "express";
import { asyncHandler } from "../middlewares/error.middleware.js";
import { attachmentStorage} from "../config/storage.js";
import multer from "multer";

const emailRouter = Router();
const emailStorage = multer({ storage: attachmentStorage });

emailRouter.post(
  "/compose", 
  emailStorage.single("email-image"), 
  verifyToken,
  asyncHandler(createEmail)
);
emailRouter.get(
  "/", 
  asyncHandler(getAllEmail)
);
emailRouter.get(
  "/:emailId", 
  asyncHandler(getEmailById)
);
emailRouter.put(
  "/:emailId", 
  emailStorage.single("email-image"), 
  asyncHandler(updateEmail)
);
emailRouter.delete(
  "/:emailId", 
  asyncHandler(deleteEmail)
);

export default emailRouter;
