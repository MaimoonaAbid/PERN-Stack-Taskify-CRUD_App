const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "3dninja",
  database: "perntodo",
});

client.connect();

client.query(
  `CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);`,
  (err, res) => {
    if (!err) {
      console.log("here");
      console.log({ str: res.rows });
    } else {
      console.log("there");
      console.log(err.message);
    }
    client.end;
  }
);

module.exports = client;
