const express = require('express');
const router= express.Router();
const mongoose= require('mongoose');
const { compileClientWithDependenciesTracked } = require('pug');
const Product = require('../models/product');


router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'Handling Get Request to /products'
    });
});
router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc=> {
        console.log("From Database ",doc);
        if(doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({
                    message:"No Valid Entry Found For Provided Id   "
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err})
    })
});
router.post('/',async(req,res,next)=>{
    const products={
        name:req.body.name,
        price:req.body.price,
    };
    const product = new Product({
        // _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price:req.body.price
    });

    try{
      
        debugger;
        let result= await product.save();
        return res.status(200).json({
            message:'Handling post Request to /products',
            ctratedProduct:result,
        });
    }
    catch(err){
        debugger;
        console.log(err);
        res.status(500).json({
           error:err
        })
        
    }
   
});
router.patch('/:productId',(req,res,next)=>{
    res.status(200).json({
        message:'Updated Collection'
    });
});
router.delete('/:productId',(req,res,next)=>{
    res.status(200).json({    
        message:'Deleted Collection'
    });
});

module.exports = router;