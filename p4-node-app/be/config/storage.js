import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const attachmentStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "attachments_mail_app",
    allowedFormats: ["jpeg", "jpg", "png"],
  },
});

export { cloudinary, attachmentStorage };
