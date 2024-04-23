
exports.reqValidate = (reqBody, validFields) => {
    let validFieldsArray = [];
    console.log(reqBody);
    //first get required fields that are present in db in order to avoid unwanted fields
    validFields.map((validField)=> {
        Object.keys(reqBody).map((key)=>{
            if(key == validField){
                // console.log("validFields", validField);
                //we are getting matching field
                validFieldsArray.push(key)
            }
        })
    })
     //Now we got the only required valid fields that are required, now iterate the valid fields array and find the missing field which is undefined or null before saving the user entry into DB
    console.log(validFieldsArray); 
    if(validFieldsArray.length == validFields.length){ //if request body has valid fields as in schema
        console.log("validFieldsArray.length == validFields.length", validFieldsArray.length == validFields.length);
        let remainingField = [];
        validFieldsArray.forEach((obj)=>{
            //if fields are missing
            if(!reqBody[obj]){
                // console.log("inside req fields",reqBody[obj]);
                remainingField.push(obj);
            }
        })
        console.log(remainingField.length);
        if(remainingField.length){
            //return missing fields message
            return {status: 401, message: `Please fill all required fields!  Remaining field(s) : ${remainingField.join(',')}, `}
            // console.log(`message: Remaining field(s) : ${remainingField.join(',')} `);
        }
        else{
            //none of the fields are missing so proceed further request to DB 
            console.log("all fields are valid and fields has value");
            return false; //fields are not missing
        }
    }  
    else{ //if request body has valid fields but missing some valid fields
        //if every thing goes wrong then return unable to register through user create service
        return {status: 401, message: "All fields are required!"};
    }
}
