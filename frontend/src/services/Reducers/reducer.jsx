import { ADD_TO_CART, CHECKOUT_ITEMS, INCREMENT_DECREMENT_SELECTED_QUANTITY } from "../constants";

export default function cartItems(state=[], action){

    switch(action.type){
        case ADD_TO_CART: 
        
            return [
                ...state,
                action.data
            ]
        case INCREMENT_DECREMENT_SELECTED_QUANTITY:
            //we are already updating the item quantity in redux store state in CustomModal, so no need to pass action.data 
            return[ 
                ...state,
            ] 
        case CHECKOUT_ITEMS:
            
            return state=[]   
        default:
            return state
    }
}