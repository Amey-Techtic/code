import { combineReducers } from "redux";
import cartItems from "./reducer";
import checkOutCartItems from "./checkoutReducer";
export default combineReducers({
    cartItems,
    checkOutCartItems

})