require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const routes = require('./api/routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Built-in JSON parser
app.use(express.urlencoded({ extended: true })); // Built-in URL parser
app.use(cors()); // Enables Cross-Origin Resource Sharing (CORS)
app.use(helmet()); // Enhances security by setting various HTTP headers
app.use(morgan('dev')); // Logs HTTP requests in the 'dev' format
app.use(cookieParser()); // Add cookie-parser middleware to handle cookies

// Routes
app.use('/', routes);

// Main page for now
app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and MySQL API' });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));