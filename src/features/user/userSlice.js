import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrders, updateUser,fetchLoggedInUser} from './userAPI';

const initialState = {
  userInfo: null,
  status: 'idle',
};


export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrder',
  async () => {
    const response = await fetchLoggedInUserOrders();
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async () => {
    const response = await fetchLoggedInUser();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo.orders= action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo= action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo= action.payload;
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUser = (state) => state.user.userInfo;

export default userSlice.reducer;
