import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db.js";
import userRouter from "./routes/user.route.js";

dotenv.config();

const app = express();
const baseUrl = "/api/v1";

db();

app.use(cors());
app.use(express.json());
app.use(`${baseUrl}/users`, userRouter);
// app.use("/", (req, res) => res.send({ app: "mail_app" }));

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`));

export default app;
