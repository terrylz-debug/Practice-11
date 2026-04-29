const express = require('express');
const app = express();

app.use(express.json());

/**
 * ENVIRONMENT VARIABLE (THIS IS WHAT YOU WERE MISSING)
 */
const greeting = process.env.GREETING || 'Hello from your deployed app!';

/**
 * HOME ROUTE
 */
app.get('/', (req, res) => {
  res.send('My app is running!');
});

/**
 * NEW REQUIRED ROUTE FOR ASSIGNMENT
 */
app.get('/api/message', (req, res) => {
  res.json({
    message: greeting
  });
});

/**
 * POST /api/notes
 */
app.post('/api/notes', (req, res) => {
  const { name, note } = req.body;

  if (!name || !note) {
    return res.status(400).json({
      error: 'Both name and note are required.'
    });
  }

  res.status(201).json({
    message: 'Note received!',
    data: {
      name,
      note
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
