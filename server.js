import express from "express"
import http from "http";

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
