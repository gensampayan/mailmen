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
app.use(helmet());

const allowedOrigins = [
  'https://mailmen.vercel.app',
  'https://mailmen-zvco1rqi0-gens-projects-9f40b61e.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));

app.use(express.json());
app.use(`${baseUrl}/users`, userRouter);
app.use(`${baseUrl}/emails`, emailRouter);
app.use(`${baseUrl}/mailbox`, mailboxRouter);
app.use(pageNotFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));

export default app;
