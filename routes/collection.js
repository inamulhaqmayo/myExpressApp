const express= require('express');
const router=express.Router();
const Collection = require('../models/collection');

router.get('/',(req,res,next)=>{
    Collection.find()
    .exec()
    .then(docs=>{
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err})
    })
});
// Get Collection By Id
router.get('/:collectionId',(req,res,next)=>{
    const id = req.params.collectoinId;
    // if(id === 'special'){
    //     res.status(200).json({
    //         message:'You Discovered the Special ID',
    //         id:id
    //     });
    // }
    // else{
    //     res.status(200).json({
    //         message:'You pased an ID'
    //     });
    // }   
    Collection.findById(id)
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
    // res.status(200).json({
    //     message:'Handling posts Request to /collections'
    // });
    const collections={
        name:req.body.name,
        price:req.body.price,
    };
    const collection = new Collection({
        name: req.body.name,
        price:req.body.price
    });


    try{
        let result= await collection.save();
        return res.status(200).json({
            message:'Handling post Request to /collection',
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

router.patch('/:CollectionId',async(req,res,next)=>{
    try {
        // debugger;
        const id = req.params.CollectionId;
        const updates=req.body;
        const result= await Collection.findByIdAndUpdate(id,updates);
        res.send(result);

    } catch (error) {
     console.log(err); 
    }
});
router.delete('/:CollectionId',(req,res,next)=>{
    try{
        return res.status(200).json({
            message:' Collection Deleted',
            
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

module.exports = router;