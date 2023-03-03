const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.post("/todos", async (req, res) => {
  {
    try {
      const { description } = req.body;
      if (!description) {
        throw new Error("Description required for creating a Todo!");
      }
      const newTodo = await pool.query(
        "INSERT INTO todo (description) VALUES ($1) RETURNING *",
        [description]
      );
      res.status(201).json(newTodo.rows[0]);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }
});

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.status(200).json(allTodos?.rows);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!Number.isInteger(id)) {
      res.status(422).send({ message: "Todos id should be an integer!" });
    }
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.status(200).json(todo?.rows);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

app.put("/todos/:id", async (req, res) => {
  {
    try {
      const id = req.params.id;
      const { description } = req.body;
      if (!Number.isInteger(+id)) {
        res.status(422).send({ message: "Todos id should be an integer!" });
      }
      if (!description) {
        res
          .status(422)
          .send({ message: "Description required for creating a Todo!" });
      }
      const newTodo = await pool.query(
        "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
        [description, id]
      );
      res.status(200).json(newTodo.rows[0]);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!Number.isInteger(id)) {
      res.status(422).send({ message: "Todos id should be an integer!" });
    }
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.status(200);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

app.listen(5000, console.log("Server started at port 5000"));
