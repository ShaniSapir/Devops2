const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000; // You can change the port if needed
app.use(express.static(path.join(__dirname)));

// Define routes to serve your files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
