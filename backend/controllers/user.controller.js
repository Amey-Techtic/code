const userService = require("../services/user.services");
const schemaValidator = require("../utils/users.validator");
const authHelper = require('../helpers/generateAuthTokens');

exports.userRegister = async(req, res) =>{
    try {
        // res.send(req.body)
        // console.log("in register controller");
        const {error } =schemaValidator.userSignupSchema.validate(req.body, ()=>{
            abortEarly: false
        });

        if(error){
            return res.status(400).send(error.message)
        }
        const userRegistered = await userService.createUser(req.body);
        if(userRegistered){
            return res.status(userRegistered.status).send({message: userRegistered.message});
        }
        else{
           return res.status(404).send({messsage: "Unable to register"});
        }
        
    } catch (error) {
        // console.log("error", error);
        return res.status(500).json({error: "Something went wrong! please try again later"})
    }
}

exports.userLogin = async (req, res) => {
    try {
        
        const {error} =schemaValidator.userLoginSchema.validate(req.body, ()=>{
            abortEarly: false
        });

        if(error){
            return res.status(200).send({message:error.message, success: false})
        }
        const userLogin = await userService.userLogin(req.body); 
        if(userLogin){
            // console.log("if user login successfull", userLogin);
            return res.status(userLogin.status).json(userLogin);
        }
        else{
            return res.status(401).json({message: "Unable to login"})
        }
    } catch (error) {
        console.log("error: ", error);
        return res.status(500).json({message: "Something went wrong! Please try again later"})
    }
}
exports.verifyRefreshToken=async(req, res)=>{
    try {
        // console.log("called refresh token");
        //getting old expired token

        const refreshToken = req.body.refreshToken;
        console.log("called refresh token",refreshToken);
        
        //decode the user data from old expired token
        const decodedToken =  authHelper.verifyToken(refreshToken);
        
        console.log("decodedToken", decodedToken);
        
        
            if(!decodedToken){
                console.log("not verified token");
                // return res.json({refreshTokenExpired: true});
            }
            console.log("inside decoded", decodedToken);
             //if the old token is verified then pass the userdata id from decoded old token to find whether that user exists or not
            const existingUser = await userService.findUserDataByTokenId(decodedToken);
            //if userdata is found from decoded token user id then generate the new token
            if(existingUser){
                const newToken = authHelper.generateToken(existingUser);
                console.log("getting new token on verify");
                return res.json({token: newToken});
            }
    } 
    catch (error) {
        console.log("error in catch" ,error);
        res.status(401).json({ message: "Invalid token" })
    }
}
exports.userProfile = async (req, res) => {
    res.status(200).json({status:true,message: "This is user profile request"});
}