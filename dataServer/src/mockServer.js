import express from 'express';
import fs from 'fs';
import { dbPath, port } from './config.js';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Read database
function readDB() {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
}

// Write to database
function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Get all products
app.get('/api/products', (req, res) => {
  const db = readDB();
  res.json(db.products);
});

// Get a specific product
app.get('/api/products/:id', (req, res) => {
  const db = readDB();
  const product = db.products[req.params.id];
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Create a new product
app.post('/api/products', (req, res) => {
  const db = readDB();
  const newId = String(Object.keys(db.products).length + 1).padStart(3, '0');
  db.products[newId] = req.body;
  writeDB(db);
  res.status(201).json({ id: newId, ...req.body });
});

// Update a product
app.put('/api/products/:id', (req, res) => {
  const db = readDB();
  if (db.products[req.params.id]) {
    db.products[req.params.id] = req.body;
    writeDB(db);
    res.json(db.products[req.params.id]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
  const db = readDB();
  if (db.products[req.params.id]) {
    delete db.products[req.params.id];
    writeDB(db);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`Mock server running at http://localhost:${port}`);
});
