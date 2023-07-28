const express = require("express");
const app = express();
const client = require("./database");
const cors = require("cors");

app.use(express.json({ limit: "100mb" }));
//middleware
app.use(cors());

//create a todo

app.post("/todos", async (req, res) => {
  try {
    // console.log("HERE")
    const { description } = req.body;
    // console.log({description});
    const newTodo = await client.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    console.log({ data: newTodo.rows });

    res.send({ messsage: "Res send successfully", data: newTodo.rows });
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await client.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await client.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await client.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await client.query(
      "DELETE FROM todo WHERE todo_id = $1",
      [id]
    );
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(8000, () => console.log("Listening on port 8000"));
