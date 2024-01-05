const express = require('express');

const app = express();

const dbConfig = require('./db');

const usersRoute = require('./routes/usersRouter');
const ticketsRoute = require('./routes/ticketsRouter');
const cartsRoute = require('./routes/cartsRouter');

app.use(express.json());
app.use('/api/users', usersRoute);
app.use('/api/tickets', ticketsRoute);
app.use('/api/carts', cartsRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));