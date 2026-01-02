import express from "express";
import payload from "payload";
import mongoose from "mongoose";
require("dotenv").config();
import orderRoutes from "./routes/orderRoutes";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";

const app = express();

// Parse CORS origins from environment variable
const corsOrigins = process.env.CORS_ORIGINS?.split(",").map((o) => o.trim()) || [];

// Redirect root to Admin panel
app.get("/", (_, res) => {
  res.redirect("/admin");
});

//MongoDB connection
mongoose.connect(process.env.DATABASE_URI, {} as mongoose.ConnectOptions);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB (custom view)");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

// CORS configuration
app.use(cors({
  origin: corsOrigins.length > 0 ? corsOrigins : '*',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}));

app.use(mongoSanitize());

// Order API
app.use(orderRoutes);

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    email: {
      transportOptions: {
        host: process.env.SMTP_HOST,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        port: Number(process.env.SMTP_PORT),
        requireTLS: true,
      },
      fromName: "K2 Drukarnia Projektów",
      fromAddress: process.env.SMTP_USER,
    },
    express: app,
  });
  // Add your own express routes here
  app.listen(process.env.PORT);
};
start();
