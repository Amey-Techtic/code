import { ADD_TO_CART, CHECKOUT_ITEMS, INCREMENT_DECREMENT_SELECTED_QUANTITY } from "../constants";

export const addToCart = (data) => {
  
  return {
    type: ADD_TO_CART,
    data: data,
  };
};

export const increasedecreaseSelectedQuantity = (data) => {
  return {
    type: INCREMENT_DECREMENT_SELECTED_QUANTITY,
  };
}

export const emptyCartItemsOnCheckout=(data)=> {
  return{
    type: CHECKOUT_ITEMS,
    data: data
  }
}