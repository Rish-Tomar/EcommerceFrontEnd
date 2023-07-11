import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart,fetchItemsByUserID,updateCartItem,deleteCartItem,resetCart} from './CartAPI';

const initialState = {
  items: [],
};


export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchItemsByUserIDAsync = createAsyncThunk(
  'cart/fetchItemsByUserID',
  async (userID) => {
    const response = await fetchItemsByUserID(userID);
    return response.data;
  }
);

export const updateCartItemAsync = createAsyncThunk(
  'cart/updateCartItem',
  async (item) => {
    const response = await updateCartItem(item);
    return response.data;
  }
);

export const deleteCartItemAsync = createAsyncThunk(
  'cart/deleteCartItem',
  async (id) => {
    const response = await deleteCartItem(id);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async () => {
    const response = await resetCart();
    return response.data;
  }
);

export const addToCartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIDAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIDAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=action.payload;
      })
      .addCase(updateCartItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index =state.items.findIndex(item=>item.id===action.payload.id)
        state.items[index]=action.payload;
      })
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index =state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(index,1)
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=[]
      })
      ;
  },
});


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectItems = (state) => state.cart.items;

export default addToCartSlice.reducer;
