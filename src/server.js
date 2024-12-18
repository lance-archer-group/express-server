const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for security
app.use(helmet());

// Enable CORS (customize as needed)
app.use(cors());

// Simple route
app.get('/', (req, res) => {
  res.json({ message: 'Hello from my secure Node.js server!' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error:', err);
  process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});
