const mongose= require('mongoose');
const productSchema=mongose.Schema({
    
    name: String,
    price: Number,


})
module.exports=mongose.model('Product',productSchema)