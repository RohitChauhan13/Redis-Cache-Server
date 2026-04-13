require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/user.route')

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/v1', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});