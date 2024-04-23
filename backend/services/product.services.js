const products = require("../models/products.model");



exports.addProducts = async(requestData) => {
    const {title, description, category, price, image} = requestData;
    try {
        const productAdded = await products.create({
            title,
            description,
            category,
            price,
            image
        });
        if(productAdded){
            return true;

        }
        else{
            return false;
        }
    } catch (error) {
        console.log("Error ", error);
        return false;
    }
}

exports.getProducts=async(req)=>{
    try {   
        const search = req.query.search || "";
        const category = req.query.category || "All";
        const page = req.query.page || 1;
        const ITEMS_PER_PAGE = req.query.limit ||10;
        const query = {
            title: {$regex: search, $options: "i"},
        }
        if(category !== "All"){
            query.category = category; 
        }
        // console.log(req.query);

        //skip
        const skip = (page - 1) * ITEMS_PER_PAGE;  
        
        //count
        const count = await products.countDocuments(query);
        // console.log(count);

        const productData = await products.find(query)
        .limit(ITEMS_PER_PAGE)
        .skip(skip);

        const pageCount = Math.ceil(count/ITEMS_PER_PAGE);

        if(productData){
            // return {data: productData, pagination: {
            //     page,
            //     pageData: productData?.length,
            //     skip,
            //     ITEMS_PER_PAGE,
            //     total: (await products.find(query))?.length
            // }};
            return {
                productData,
                Pagination:{
                    count, pageCount
                }
            }
        }   
        else{
            return false;
        }
        
    } catch (error) {
        console.log("Error in get product service: ", error);
        return false;
    }
}

