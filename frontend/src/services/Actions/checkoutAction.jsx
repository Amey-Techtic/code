import { CHECKOUT_ITEMS } from "../constants";

export const handleCheckOutItems=(data)=>{
    return {
        type: CHECKOUT_ITEMS,
        data: data
    };
};