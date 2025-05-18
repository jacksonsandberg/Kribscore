const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Path to data file
const dataFilePath = path.join(__dirname, 'data.json');

// Helper function to read data file
async function readDataFile() {
  const data = await fs.readFile(dataFilePath, 'utf8');
  return JSON.parse(data);
}

// Helper function to write to data file
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

// GET a single property by ID
app.get('/api/properties/:id', async (req, res) => {
  try {
    const properties = await readDataFile();
    const property = properties.find(p => p.id === parseInt(req.params.id));
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    res.json(property);
  } catch (error) {
    console.error('Error retrieving property:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new property
app.post('/api/properties', async (req, res) => {
  try {
    const properties = await readDataFile();
    
    // Create a new property with a unique ID
    const newId = properties.length > 0 
      ? Math.max(...properties.map(p => p.id)) + 1 
      : 1;
    
    const newProperty = {
      id: newId,
      ...req.body
    };
    
    properties.push(newProperty);
    await writeDataFile(properties);
    
    res.status(201).json(newProperty);
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ message: 'Error creating property' });
  }
});

// PUT (update) an existing property
app.put('/api/properties/:id', async (req, res) => {
  try {
    const properties = await readDataFile();
    const id = parseInt(req.params.id);
    const propertyIndex = properties.findIndex(p => p.id === id);
    
    if (propertyIndex === -1) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    // Update the property (keeping the same id)
    const updatedProperty = {
      id,
      ...req.body
    };
    
    properties[propertyIndex] = updatedProperty;
    await writeDataFile(properties);
    
    res.json(updatedProperty);
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ message: 'Error updating property' });
  }
});

// DELETE a property
app.delete('/api/properties/:id', async (req, res) => {
  try {
    const properties = await readDataFile();
    const id = parseInt(req.params.id);
    const propertyIndex = properties.findIndex(p => p.id === id);
    
    if (propertyIndex === -1) {
      return res.status(404).json({ message: 'Property not found' });
    }
    
    // Remove the property
    properties.splice(propertyIndex, 1);
    await writeDataFile(properties);
    
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ message: 'Error deleting property' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});