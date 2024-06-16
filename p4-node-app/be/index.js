import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db.js";
import userRouter from "./routes/user.route.js";
import emailRouter from "./routes/email.route.js";
import { pageNotFound, errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();
const baseUrl = "/api/v1";

db();

app.use(cors());
app.use(express.json());

app.use(`${baseUrl}/users`, userRouter);
app.use(`${baseUrl}/emails`, emailRouter);

app.use(pageNotFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));

export default app;
