const bcrypt = require("bcryptjs");

exports.generateHashedPassword = async(requestPassword)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(requestPassword, salt);
    return hashedPassword;
}

exports.compareHashedPassword=async(reqPassword, userHashedPassword)=>{
    const comparePassword = await bcrypt.compare(reqPassword, userHashedPassword);
    return comparePassword;
}