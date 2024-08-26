const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let systemVersion = 'v3.78.146'; 

app.get('/api/version', (req, res) => {
  res.json({ version: systemVersion });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.get('/api/storeinfo', (req, res) => {
  const storeInfo = {
    storeNumber: '1057',
    registerNumber: 'KASA 1',
    registerIP: '10.0.2.16',
    version: systemVersion
  };
  res.json(storeInfo);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
