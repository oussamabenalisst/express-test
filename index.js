import mysql from "mysql";
import express from "express";
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

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
  const sql = "SELECT `ipProduct`,`name`,`pr` FROM `product` WHERE 1";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des produits:", err);
      res.status(500).json({ error: "Erreur lors du chargement des produits" });
      return;
    }
    res.json(results);
  });
});

app.get("/hello", (req, res) => {
  res.send({
    name: "putin",
    prenom: "vladimar",
  });
});

app.get("/update/:id/:name", (req, res) => {
  const sql =
    "UPDATE `product` SET `name`='" +
    req.params.name +
    "' WHERE `ipProduct`=" +
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

app.get("/product/:id", (req, res) => {
  const sql =
    "SELECT `ipProduct`,`name`,`pr` FROM `product` WHERE `ipProduct`=" +
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

app.post("/regester", (req, res) => {
  try {
    const { email, passwd, num, key } = req.body;

    if (!email || !passwd || !num || !key) {
      return res.status(400).json({ error: "error input" });
    }

    const checkSql = "SELECT * FROM `clients` WHERE `email` = ? ";
    db.query(checkSql, [email, passwd], (err, results) => {
      if (err) {
        console.error("Erreur lors de la vérification des clients:", err);
        return res
          .status(500)
          .json({ error: "Erreur lors de la vérification des clients" });
      }

      if (results.length > 0) {
        return res.status(409).json({ message: "email ex" });
      }
      const insertSql =
        "INSERT INTO `clients`(`email`, `password`, `numTl`, `keyy`) VALUES (?, ?, ?, ?)";
      db.query(insertSql, [email, passwd, num, key], (err, result) => {
        if (err) {
          console.error("Erreur lors de l'insertion du client:", err);
          return res
            .status(500)
            .json({ error: "Erreur lors de l'insertion du client" });
        }

        res.status(201).json({
          message: "good",
          clientId: result.insertId,
        });
      });
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Unexpected error" });
  }
});

app.get("/maxproducts", async (req, res) => {
  try {
    const response = await fetch("http://localhost:3000/products");
    const list = await response.json();
    let maxproduits = list.reduce(
      (max, product) => (product.pr > max.pr ? product : max),
      list[0]
    );
    res.send(maxproduits);
  } catch (err) {
    console.error("Error fetching or processing products:", error);
    res.status(500).json({ error: "Error fetching or processing products" });
  }
});

app.get("/close", (req, res) => {
  db.end((err) => {
    if (err) {
      console.error("Error ending connection: " + err.stack);
    }
    console.log("Connection closed");
  });
});
