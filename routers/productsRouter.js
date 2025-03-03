const router = require('express').Router();

let data = require('../data.js');

router.get('/', (req, res) => {
    //res.send("Welcome to the products page.")
    res.status(200).json(data);
});

let nextID = 4;
router.post('/', (req, res, next) => {
    let newProduct = req.body;
    if(!newProduct.productName) {
        next({
            statusCode: 400, 
            errorMessage: "To add a product, please enter the product name."
        });
    } else if(newProduct.productName && !newProduct.product) {
        next({
            statusCode: 400,
            errorMessage: "Please enter a product."
        });
    } else {
        newProduct.id = nextID;
        nextID++;
        data.push(newProduct);
        req.status(201).json(newProduct);
    }
});

router.delete('/:id', (req, res) => {
    const deleteProductID = req.params.id;
    const deleteProduct = data.find(product => product.id == Number(deleteProductID));

    if(deleteProduct) {
        data = data.filter(product => product.id !== Number(deleteProductID));
        res.status(204).end();
    } else {
        res.status(404).json({errorMessage: "The data you are trying to delete is not valid."});
    }
});

router.get('/:id', (req, res) => {
    //console.log("req.params", req.params); //url
    //console.log("req.query", req.query); //string ? key-value
    //console.log("req.body", req.body); //post put ...

    const { id } = req.params;
    const product = data.find(product => product.id == parseInt(id));

    if(product) {
        res.status(200).json(product);
    } else {
        res.status(404).send("The page you are looking for could not be found.");
    }
});

module.exports = router;