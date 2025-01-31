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
app.use(cors());
app.use((__, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  next();
});
app.use(express.json());
app.use(`${baseUrl}/users`, userRouter);
app.use(`${baseUrl}/emails`, emailRouter);
app.use(`${baseUrl}/mailbox`, mailboxRouter);
app.use(pageNotFound);
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`)
);

export default app;
