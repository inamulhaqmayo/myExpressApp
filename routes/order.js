const express= require('express');
const router=express.Router();
router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'order were Fetched'
    });
});
router.post('/',(req,res,next)=>{
    const order=
    {
        productId: req.body.productId,
        quanity:req.body.quanity,
    }
    res.status(201).json({
        message:'order were created',
        order:order,
    });
});
router.get('/:orderId',(req,res,next)=>{
    const orderId = req.params.productId;
   
        res.status(200).json({
            message:'order Details',
            orderId:req.params.orderId
        });
   
    } );
router.patch('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message:'Updated order'
    });
});
router.delete('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message:'Deleted order',
        orderId:req.params.orderId
    });
});

module.exports = router;