import cors from "cors";
import "dotenv/config.js";
import express from "express";
import connectToMongo from "./src/db.js";
import userRoutes from './src/router/routes.js'
import formatSeconds from "./src/utils/formatSeconds.js";

const app = express();
const PORT = process.env.PORT || 3000;

let corsOptions = {
  origin: 'https://jitishxd.github.io',
  // origin: 'http://localhost:5173',
  credentials: true, 
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) crash on 204
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/v1", userRoutes);

app.get("/", (req, res) => {
  res.json({
    uptime: process.uptime(),
    uptimeFormatted: formatSeconds(process.uptime()),
    requestHeaders: req.headers,
  });
});

app.get("/home", (req, res) => {
  console.log(req.userid);
  console.log("route is running");
  return res.send("This is my home page");
});

const startServer = async () => {
  try {
    await connectToMongo();

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();