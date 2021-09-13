const express= require('express');
const router=express.Router();
router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'Handling Get Request to /collections'
    });
});
router.post('/',(req,res,next)=>{
    res.status(200).json({
        message:'Handling posts Request to /collections'
    });
});
router.get('/:collectionId',(req,res,next)=>{
    const id = req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            message:'You Discovered the Special ID',
            id:id
        });
    }
    else{
        res.status(200).json({
            message:'You pased an ID'
        });
    }   
});
router.patch('/:CollectionId',(req,res,next)=>{
    res.status(200).json({
        message:'Updated Collection'
    });
});
router.delete('/:CollectionId',(req,res,next)=>{
    res.status(200).json({
        message:'Deleted Collection'
    });
});

module.exports = router;