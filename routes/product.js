const express = require('express');
const router= express.Router();
const mongoose= require('mongoose');
const { compileClientWithDependenciesTracked } = require('pug');
const Product = require('../models/product');
const multer=require("multer");
const storage = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'uploads/');

    },
    filename:function(req,file,cb){

        cb(null,new Date().toDateString()+ file.originalname)
    }
});
const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'application/pdf' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){
        cb(null, true);
    }else{
        cb(null, false);
    }
};
//var upload = multer({ storage: storage })


  const upload =multer({dest:'uploads/'});
//const upload =multer({storage:storage});
router.get('/',(req,res,next)=>{
    Product.find()
    .select('name price _id')
    .exec()
    .then(docs=>{
        const response={
            count:docs.length,
            products:docs.map(doc=>{
                return{
                    name:doc.name,
                    price:doc.price,
                    _id:doc._id, 
                    request:{
                        type:'GET',
                        url:'http://localhost:3000/products/'+ doc._id
                    }
                }
            })

        };
        // console.log(docs);
         // if(docs.length>=0){
            res.status(200).json(response);
        // }
        // else{
        //     res.status(404).json({
        //         message:"not Entries Found"
        //     });
        // }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err})
    })
   
});
router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id')
    .exec()
    .then(doc=> {
        console.log("From Database ",doc);
        if(doc){
            res.status(200).json({
                product:doc,
                type:"GET",
                // description:"Get All Products",
                url:"http://localhost:3000/products/"
            });
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
router.post('/',upload.single('productImage'),async(req,res,next)=>{
    // console.log(req.file);
    const products={
        name:req.body.name,
        price:req.body.price,
    };
    const product = new Product({
        name: req.body.name,
        price:req.body.price,
        
    });

    try{
      
        debugger;
        let result= await product.save();
        return res.status(200).json({
            message:'Product Succesfully Added',
            // ctratedProduct:result,
            ctratedProduct:{
                name:result.name,
                price:result.price,
                _id:result._id,
                request:{
                    type:"GET",
                    url:"http://localhost:3000/produts/" + result._id
                }
            }
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
router.patch('/:productId',async(req,res,next)=>{
    try {
        const id = req.params.productId;
        const updates=req.body;
        const result= await Product.findByIdAndUpdate(id,updates);
        // res.send(result);
        res.send({
            message:"product Updated",
            request:{
                Type:"GET",
                url:"http://localhost/products/ " + id
            }
        });

    } catch (error) {
     console.log(err); 
    }
    // const updateOps= {};
    // for(const ops of req.body){
    //     updateOps[ops.opsName]= ops.value;

    // }
    // Product.updateOne({_id:id},{$set:updateOps})
    //     .exec()
    // .then(result=>{
    //     console.log(result);
    //     res.status(200).json(result);
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.status(500).json({error:err})
    // });
}
);
router.delete('/:productId',(req,res,next)=>
{
    const id = req.params.productId;
    Product.remove({_id:id})
        .exec()
    .then(docs=>{
        console.log(docs);
        // res.status(200).json(docs);
        res.status(200).json({
            message:"PRoduct Deleted",
            request:{
                type:"POST",
                url:"http://localhost:400/products/",
                body:{name:'String',price:'Number'}
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err})
    });
});

module.exports = router;