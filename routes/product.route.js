const express = require('express');
const router= express.Router();
 const Product = require('../models/product.model')

 //Create a new Product

 router.post("/",(req,res)=>{
    const {name,price,description}=req.body

    const product = new Product(name,price,description)
    product.save()
    .then((res)=>{
        res.status(200).json(res)
    })
    .catch((error)=>{
        res.status(500).json({ error: 'Failed to create a product' });
    });
 })



 //Update a product

 router.put('/:id',(req,res)=>{
    const {id}=req.params

    const {name,price,description}=req.body

    Product.findByIdAndUpdate(id,{name,price,description})
    .then((product)=>{
        res.status(200).json(product)
    })
    .catch((error)=>{
        res.status(500).json({ error: 'Failed to update a product' });
    });
 })

 //To get all products
 router.get('/',(req,res)=>{
    Product.find()
    .then((product)=>{
        res.status(200).json(product)
    })
    .catch((error)=>{
        res.status(500).json({error:"Product not found"})
    });
 });

 // Delete product

 router.delete('/:id',(req,res)=>{

    const {id} = req.params
    Product.findByIdAndDelete(id)
    .then((product)=>{
        res.status(200).json({message:"Product deleted"})
    })
    .catch((error)=>{
        res.status(500).json({error:"Failed to delete the product"})
    });

 })

 module.exports =router;