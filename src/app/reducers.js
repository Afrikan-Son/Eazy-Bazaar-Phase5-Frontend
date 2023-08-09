import { combineReducers } from 'redux';
import cartReducer from '../features/cart/cartSlice'; // Replace 'cartReducer' with your actual cart reducer


const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;
