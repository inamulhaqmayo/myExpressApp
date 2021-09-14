const mongose= require('mongoose');
const productSchema= new mongose.Schema({
    
    name: {
        type: String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },


})
module.exports=mongose.model('Product',productSchema)