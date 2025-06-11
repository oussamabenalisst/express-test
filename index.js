const mysql = require("mysql");
const express = require("express");
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "artshop",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  console.log("Connected to the database!");
});

app.get("/products", (req, res) => {
  const sql = "SELECT `ipProduct`,`name`,`pr`,`vu` FROM `product` WHERE 1";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des produits:", err);
      res.status(500).json({ error: "Erreur lors du chargement des produits" });
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

app.get("/product/:id", (req, res) => {
  const sql =
    "SELECT `ipProduct`,`name`,`pr`,`vu` FROM `product` WHERE `ipProduct`=" +
    req.params.id +
    ";";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des produits:", err);
      res.status(500).json({ error: "Erreur lors du chargement des produits" });
      return;
    }
    res.json(results);
  });
});

app.get("/close", (req, res) => {
  db.end((err) => {
    if (err) {
      console.error("Error ending connection: " + err.stack);
    }
    console.log("Connection closed");
  });
});
