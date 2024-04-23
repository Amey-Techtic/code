const validators = require("../helpers/validateRequest");
const User = require("../models/users.model");
const hashPasswordHelper = require("../helpers/hashPassword");
const authTokenHelper = require("../helpers/generateAuthTokens");
require('dotenv').config();


exports.createUser = async (reqBody) => {
    const {username, email, password} = reqBody;
    // console.log("inside createUser", reqBody);
    const isFieldMissing = validators.reqValidate(reqBody, ['username', 'email', 'password']);
    if(isFieldMissing){
        return isFieldMissing;
    }
    else{

        const isUsernameExists = await User.findOne({username});
        if(isUsernameExists){
            return {status: 401, message: "Username already exists, please try another username!"}
        }
        else{
            const isEmailExists = await User.findOne({email});
            if(isEmailExists){
                return {status: 401, message: "User email already exists"};
            }
            else{
                
                // const salt = await bcrypt.genSalt(10);
                // const hashedPassword = await bcrypt.hash(password, salt);
                const hashedPassword = await hashPasswordHelper.generateHashedPassword(password);
                await User.create({
                        username,
                        email,
                        password: hashedPassword
                    });
                return {status: 200, message: "Registered successfully!"}
            }
    
        }
    }
    
}

exports.userLogin = async (reqBody) => {
    // console.log("inside userlogin service", reqBody);
    const missingFields = validators.reqValidate(reqBody, ["email", "password"]);
    if(missingFields){
        // console.log("inside missing field");
        return missingFields;
    }
    if(!missingFields){
        // console.log("inside not missing field");
        const {email, password} = reqBody;
        const userData = await User.findOne({email});
        if(userData){
           const matchPassword = await hashPasswordHelper.compareHashedPassword(password, userData.password);
            if(matchPassword){
                //if login successfull, then generate token
                const accessToken = authTokenHelper.generateToken(userData);
                const refreshToken = authTokenHelper.generateRefreshToken(userData);
                const user = {
                    username: userData.username,
                    email: userData.email
                }
                return {status: 200, message: "Logged in successfully", auth: accessToken, refresh: refreshToken ,user: user}
            }
            else{
                return {status: 401, message: "Invalid Credentials!"}
            }

        }
        else{
            return {status: 401, message: "Invalid Credentials!"}
        }
    }
}

exports.findUserDataByTokenId=async(decodedToken)=>{
    const existingUser = await User.findById(decodedToken.id);
    if(!existingUser){
        throw new Error("User not found!");
    }
    else{
        console.log("inside finduserdatabytoken", existingUser);
        return existingUser; 
    }
    

}
