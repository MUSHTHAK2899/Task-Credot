import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { productId } = action.payload;
      const existingProduct = state.products.find(product => product.id === productId);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ id: productId, quantity: 1,isCheck: true });
      }
    },
    incrementProductCount: (state, action) => {
      const { productId } = action.payload;
      const existingProduct = state.products.find(product => product.id === productId);

      if (existingProduct) {
        existingProduct.quantity += 1;
      }
    },
    decrementProductCount: (state, action) => {
      const { productId } = action.payload;
      const existingProductIndex = state.products.findIndex(product => product.id === productId);

      if (existingProductIndex !== -1) {
        const existingProduct = state.products[existingProductIndex];

        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          state.products.splice(existingProductIndex, 1);
        }
      }
    },
  },
});

export const { addToCart, incrementProductCount, decrementProductCount } = cartSlice.actions;

export const selectCart = state => state.cart;

export default cartSlice.reducer;
