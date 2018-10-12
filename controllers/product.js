'use strict'

const Product = require('../models/product')

function getProduct (req, res){
    let productID = req.params.productID

    Product.findById(productID, (err, product) => {
      if(err) res.status(500).send({mesagge: `Error al realizar la peticion: ${err}`})
      if (!product) return res.status(404).send({message: `El producto no existe`})
  
      res.status(200).send({product})
  
    })
}

function getProducts(req, res){
    Product.find({}, (err, products) => {
        if(err) res.status(500).send({mesagge: `Error al realizar la peticion: ${err}`})
        if (!products) return res.status(404).send({message: `No existen productos`})

        res.status(200).send({products})
    })
}

function saveProduct (req, res){
    console.log('POST /api/product')
    console.log(req.body)

    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description
    
    product.save((err, productStored) => {
        if(err) res.status(500).send ({message: `Error al salvar en la BD: ${err}`})

        res.status(200).send({product: productStored})
    })
}

function updateProduct (req, res){
    let productID = req.params.productID
    let update = req.body

    Product.findByIdAndUpdate(productID, update, (err, productUpdated)=>{
        if(err) res.status(500).send({mesagge: `Error al actualizar el producto: ${err}`})

        res.status(200).send({product: productUpdated})
    })
}

function deleteProduct (req, res){
    let productID = req.params.productID

    Product.findById(productID, (err, product) => {
      if(err) res.status(500).send({mesagge: `Error al borrar el prodcuto: ${err}`})
      //if (!product) return res.status(404).send({message: `El producto no existe`})
      product.remove(err => {
          if(err) res.status(500).send({mesagge: `Error al borrar el producto: ${err}`})
          res.status(200).send({message: `El producto ha sido eliminado`})
      })
      
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}