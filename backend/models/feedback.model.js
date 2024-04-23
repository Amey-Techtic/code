const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "products" 
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "users"
    },
    rating: {
        type: Number,
        require: false
    }
});

