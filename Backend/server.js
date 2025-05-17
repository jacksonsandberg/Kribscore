const express = require('express');
const app = express();
const PORT = 5001;

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

app.get('/api/properties', (req, res) => {
  const properties = [
    {
      id: 1,
      name: 'Laie Hale',
      address: '55-123 Kulanui St',
      rent: '$650/month'
    },
    {
      id: 2,
      name: 'Hauula House',
      address: '54-321 Hana St',
      rent: '$700/month'
    }
  ];
  res.json(properties);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
