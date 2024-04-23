const mongoose = require('mongoose');

exports.mongoDBConnect = (URL) =>{
    mongoose.connect(URL, {
        useUnifiedTopology: true,
        useNewURLParser: true
    })
    .then(()=>{
        console.log("Database connected successfully!");
    })
    .catch((error)=>{
        console.log("Error ", error);
    })
}