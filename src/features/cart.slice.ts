import { createSlice } from '@reduxjs/toolkit';
import { ICart} from './cart.types';
import { Product } from '../types/product.types';

const initialState = {
    cart:[] as  ICart["products"],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addToCart: (state, action) => {
        const newItem = action.payload;
        const newID = newItem.map((x: Product) => x?.id);
          state.cart = [...state.cart.filter(x => !newID.includes(x?.id)), ...newItem];
      },
      removeFromCart: (state, action) => {
        console.log(state,action,"removed")
      },
      decrementQuantity: (state, action) => {
        state.cart = state.cart.map(item => {
          if (item?.id === action.payload) {
            const newQuantity =  item?.quantity - 1
      
            return {
              ...item,
              quantity: newQuantity,
            };
          }
          return item;
        }).filter(item => item?.quantity > 0);
      },
      
      incrementQuantity: (state, action) => {
        const updatedItems = state.cart.map(item => {
          if (item?.id === action.payload) {
            return {
              ...item,
              quantity: item?.quantity + 1,
            };
          }
          return item;
        });
        state.cart = updatedItems;
      }
      
    },
    
  });
  

export const { addToCart, removeFromCart,decrementQuantity,incrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
