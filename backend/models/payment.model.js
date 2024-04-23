const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "products"
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "users",
    },
    email: {
        type: String,
        require: true,
    },
    amount:{
        type: Number,
        require: true
    }
});

module.exports = mongoose.model("payment", paymentSchema);