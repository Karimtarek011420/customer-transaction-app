const express = require('express');
const cors = require('cors');
const data = require('./data.json');

const app = express();
const port = 5000;

app.use(cors());

app.get('/api/customers', (req, res) => {
  res.json(data.customers);
});

app.get('/api/transactions', (req, res) => {
  res.json(data.transactions);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
