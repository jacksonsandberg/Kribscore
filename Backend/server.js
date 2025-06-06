const ADMIN_USER = {
  username: 'Admin',
  password: 'Byu-Hawaii25',
};
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'mysecretkey'; // Change this to something more secure in production

const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Middleware to authenticate JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// LOGIN route (moved before routes that need it)
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
    const token = jwt.sign({ role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Path to data file
const dataFilePath = path.join(__dirname, 'data.json');

async function readDataFile() {
  const data = await fs.readFile(dataFilePath, 'utf8');
  return JSON.parse(data);
}

async function writeDataFile(data) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}

// GET all properties
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await readDataFile();
    res.json(properties);
  } catch (error) {
    console.error('Error reading properties data:', error);
    res.status(500).json({ message: 'Error retrieving properties' });
  }
});

// GET a single property
app.get('/api/properties/:id', async (req, res) => {
  try {
    const properties = await readDataFile();
    const property = properties.find(p => p.id === parseInt(req.params.id));
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    console.error('Error retrieving property:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PROTECTED: POST a new property
app.post('/api/properties', authenticateToken, async (req, res) => {
  try {
    const properties = await readDataFile();
    const newId = properties.length > 0 
      ? Math.max(...properties.map(p => p.id)) + 1 
      : 1;

      const { name, address, rent, gender, rating } = req.body;
      const newProperty = {
        id: newId,
        name,
        address,
        rent,
        gender,
        rating,
      };
      
    properties.push(newProperty);
    await writeDataFile(properties);

    res.status(201).json(newProperty);
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ message: 'Error creating property' });
  }
});

// PROTECTED: PUT (update) a property
app.put('/api/properties/:id', authenticateToken, async (req, res) => {
  try {
    const properties = await readDataFile();
    const id = parseInt(req.params.id);
    const index = properties.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json({ message: 'Property not found' });

    const { name, address, rent, gender, rating } = req.body;
const updatedProperty = {
  id,
  name,
  address,
  rent,
  gender,
  rating,
};

    properties[index] = updatedProperty;
    await writeDataFile(properties);

    res.json(updatedProperty);
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ message: 'Error updating property' });
  }
});

// PROTECTED: DELETE a property
app.delete('/api/properties/:id', authenticateToken, async (req, res) => {
  try {
    const properties = await readDataFile();
    const id = parseInt(req.params.id);
    const index = properties.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json({ message: 'Property not found' });

    properties.splice(index, 1);
    await writeDataFile(properties);

    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ message: 'Error deleting property' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
