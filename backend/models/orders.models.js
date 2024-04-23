const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "users"
    },
    totalAmount: {
        type: Number,
        require: true
    },
    product: {
       type: Array,
       require: true,
    }
});

module.exports = mongoose.model("order", orderSchema); 