const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: {
        type:String,
        require: true,
    },
    description: {
        type:String,
        require: true,
    },
    price: {
        type: Number,
        require: true
    },
    category: {
        type:String,
        require: true,
    },
    image:{
        type: String,
        require: true
    },
});

module.exports = mongoose.model("product", productSchema); 