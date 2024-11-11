import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send(
    "Welcome to our API! Abandon all hope, ye who enter here... Just kidding, it’s safe!"
  );
});

app.get("/reservation", (req, res) => {
  throw new Error(
    "Oops! Looks like the reservation gremlins are at it again..."
  );
});

app.use((error, req, res, next) => {
  console.error("Uh-oh, we hit a snag:", error);
  res
    .status(500)
    .json({ message: "Whoopsie daisy! Our bad... something went sideways." });
});

app.get("/data", (req, res) => {
  try {
    throw new Error("Database took a coffee break, please try again later!");
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error: ${error.message}. Hang tight, we're on it!` });
  }
});

app.listen(3000, () => {
  console.log(
    "Server is up and running like a hamster on a wheel! Visit http://localhost:3000"
  );
});
