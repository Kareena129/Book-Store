import express from "express";
import { PORT, mongouri } from "./config.js";
import mongoose from "mongoose";
import bookroute from "./routes/bookroute.js";
import cors from "cors"; // Import cors

const app = express();

// Use cors middleware
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Define routes
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome To MERN Stack Tutorial");
});

app.use("/books", bookroute);

// Connect to MongoDB and start server
mongoose
  .connect(mongouri)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
