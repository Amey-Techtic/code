import { CHECKOUT_ITEMS } from "../constants";

export default function checkOutCartItems(state=[], action){
    switch(action.type){
        case CHECKOUT_ITEMS: 
        console.log("checkout state", state);

        return[
            ...state,
            ...action.data
        ]
        default: 
        return state
    }
}