const express = require('express');
const routes = express.Router();

const CategoryController = require('./controllers/CategoryController');
const ProductController = require('./controllers/ProductController');

routes.get('/', (request, response) => {
    return response.json({ status: "OK" })
});

// CATEGORIAS
routes.post('/category', CategoryController.save);
routes.get('/category', CategoryController.list);
routes.get('/category/:id', CategoryController.listById);
routes.delete('/category/:id', CategoryController.delete);
routes.put('/category/:id', CategoryController.update);

// PRODUTOS
routes.get('/product', ProductController.list);
routes.get('/product/:id', ProductController.listById);
routes.post('/product', ProductController.save);
routes.put('/product/:id', ProductController.update);
routes.delete('/product/:id', ProductController.delete);

module.exports = routes;
