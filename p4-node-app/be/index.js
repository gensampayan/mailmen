import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import db from "./config/db.js";
import userRouter from "./routes/user.route.js";
import emailRouter from "./routes/email.route.js";
import { mailboxRouter } from "./routes/mailbox.route.js";
import { pageNotFound, errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();
const baseUrl = "/api/v1";

db();

// CORS configuration
const allowedOrigins = [
  'https://mailmen-2ufjnw4lc-gens-projects-9f40b61e.vercel.app', 
  'https://your-other-allowed-origin.com'
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());
app.use(helmet());

app.use(`${baseUrl}/users`, userRouter);
app.use(`${baseUrl}/emails`, emailRouter);
app.use(`${baseUrl}/mailbox`, mailboxRouter);

app.use(pageNotFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));

export default app;
