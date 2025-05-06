const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const db = require('./config/db');

dotenv.config();

const app = express();
app.get("/", (req, res) => {
    res.send("Welcome to Gifterra")
})

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

app.listen(process.env.port, async () => {
    console.log(`Server is running on port ${process.env.port}`);

}) 
