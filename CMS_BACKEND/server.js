import express from "express"
import http from "http";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);

const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
