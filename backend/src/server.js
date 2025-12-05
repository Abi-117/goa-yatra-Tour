const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');


dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));


app.use('/api/auth', require('./routes/auth'));
app.use('/api/pages', require('./routes/adminPages'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on', PORT));