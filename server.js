const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(__dirname)); // Serve images, HTML, CSS, etc.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// API route to return product data
app.get('/api/products', (req, res) => {
  const filePath = path.join(__dirname, 'products.json');
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error("❌ Failed to read products.json:", err);
      return res.status(500).json({ error: 'Failed to load products' });
    }

    try {
      const products = JSON.parse(data);
      res.json(products);
    } catch (parseErr) {
      console.error("❌ JSON parse error:", parseErr);
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
