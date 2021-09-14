const mongose= require('mongoose');
const collectionSchema= new mongose.Schema({
    
    name: {
        type: String
    },
    price: {
        type:Number
    },


})
module.exports=mongose.model('collection',collectionSchema)