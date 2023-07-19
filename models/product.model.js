const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const productShema=new Schema({
    name:{type:String, required:true},
    price:{type:Number, required:true},
    description:{type:String}
})


const Product=mongoose.model('Product',productShema)


module.exports =Product;