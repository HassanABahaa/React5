const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let products = [
  { id: "1", name: "Phone", price: 500 },
  { id: "2", name: "Headphones", price: 200 },
];

// GET ALL
app.get("/products", (req, res) => {
  res.json(products);
});

// ADD
app.post("/products", (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const newProduct = {
    id: uuidv4(),
    name,
    price,
  };

  products.push(newProduct);
  res.json(newProduct);
});

// DELETE
app.delete("/products/:id", (req, res) => {
  products = products.filter(p => p.id !== req.params.id);
  res.json({ message: "Deleted" });
});

// UPDATE
app.put("/products/:id", (req, res) => {
  const { name, price } = req.body;

  products = products.map(p =>
    p.id === req.params.id ? { ...p, name, price } : p
  );

  res.json({ message: "Updated" });
});

// DETAILS
app.get("/products/:id", (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  res.json(product);
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});