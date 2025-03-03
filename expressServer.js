const express = require('express');

const productsRouter = require('./routers/productsRouter.js');
const logger = require('./middlewares/logger.js');
const errorHandling = require('./middlewares/errorHandling.js');

const server = express();
server.use(express.json());
server.use(logger);
server.use('/products', productsRouter);

server.get('/', (req, res) => {
    res.send("Welcome to the express server.");
});

server.use(errorHandling);

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});