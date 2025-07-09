const express = require("express");
const db = require("./db");

// Define express app
const app = express();
const port = 4000;

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.get("/api/ping", (req, res) => res.json({ message: "pong" }));
app.get("/api/students", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM students");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});
app.get("/api/greet", (req, res) => {
  const name = req.query.name || "invitado";
  res.send(`Hola, ${name}!`);
});

app.post("/students", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "El nombre es requerido" });
  }

  try {
    const result = await db.query(
      "INSERT INTO students (name) VALUES ($1) RETURNING id, name",
      [name]
    );

    const student = result.rows[0];
    res.status(201).json(student);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al agregar estudiante" });
  }
});

// Start the server
app.listen(port, () => console.log(`App running on port ${port}`));
