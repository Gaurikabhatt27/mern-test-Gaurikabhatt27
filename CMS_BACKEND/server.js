import express from "express"
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import createRoutes from "./routes/courseRoutes";

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("./api/auth", authRoutes);
app.use("/api/courses", createRoutes);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
