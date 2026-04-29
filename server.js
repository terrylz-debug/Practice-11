const express = require('express');
const app = express();

// Middleware to parse JSON data
app.use(express.json());

/**
 * HOME ROUTE
 * This fixes "Cannot GET /"
 */
app.get('/', (req, res) => {
  res.send('My app is running!');
});

/**
 * POST /api/notes
 * Accepts a name and note, validates input, and returns confirmation
 */
app.post('/api/notes', (req, res) => {
  const { name, note } = req.body;

  // Validation
  if (!name || !note) {
    return res.status(400).json({
      error: 'Both name and note are required.'
    });
  }

  // Success response
  res.status(201).json({
    message: 'Note received!',
    data: {
      name,
      note
    }
  });
});

// Start server (IMPORTANT for Render/AWS)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});