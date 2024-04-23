const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

exports.generateToken = (userData)=>{
    console.log('SECRET_KEY :>> ', SECRET_KEY);
    // console.log("generate token data: ",userData);
    const token = jwt.sign({
                        email: userData.email,
                        id: userData._id
                    },
                        SECRET_KEY,
                    {
                        expiresIn: "10h"
                    })
    if(token){
        return token;
    }
}

exports.generateRefreshToken = (userData)=>{
    // console.log("generate token data: ",userData);
    const token = jwt.sign({
                        email: userData.email,
                        id: userData._id
                    },
                        SECRET_KEY,
                    {
                        expiresIn: "20h"
                    })
    if(token){
        return token;
    }
}

exports.verifyToken = (token) => {
    //this will return user data
    if(jwt.verify(token, SECRET_KEY)){
        return jwt.verify(token, SECRET_KEY)
    }
    else{
        false;
    }
} 