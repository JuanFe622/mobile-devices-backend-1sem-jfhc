const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const userRoutes = require('./src/routes/UserRoutes')

const app = express()
app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

// Rutas

app.use('/users', userRoutes)

require('dotenv').config()

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});