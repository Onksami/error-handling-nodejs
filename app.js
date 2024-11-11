import express from "express";
import { createReservation, getReservation } from "./database.js";

const app = express();
app.use(express.json());

app.post("/reserve", (req, res) => {
  createReservation(req.body, (error, result) => {
    if (error) {
      return res.status(500).json({ message: error });
    }
    res.status(201).json({ message: "reservation successfull", data: result });
  });
});

app.get("reservation/id", async (req, res) => {
  try {
    const result = await getReservation(req.params.id);
    res.status(200).json({ message: "Here is the reservation", data: result });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.get("/broken-route", (req, res, next) => {
  const error = new Error("This route is broken");
  next(error);
});

app.use((error, req, res, next) => {
  console.error("Soorry!", error);
  res.status(500).json({ message: "Something went wrong" });
});

app.use((error, req, res, next) => {
  console.error("error:", error.message || error);
  if (error.message && error.message.includes("Database")) {
    res.status(500).json({ message: " There was an issue with the database" });
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
