import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser,checkUser, SignOutUser} from './authAPI';
import { updateUser } from '../user/userAPI';

const initialState = {
  loggedInUser:null,
  value: 0,
  status: 'idle',
  error:null
};


export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo,{rejectWithValue}) => {
   try{
    const response = await checkUser(loginInfo);
    return response.data;
   }catch(error){
    console.log(error)
    return rejectWithValue(error)
   }
  }
);

export const SignOutUserAsync = createAsyncThunk(
  'user/SignOutUser',
  async (userID) => {
    const response = await SignOutUser(userID);
    return response.data;
  }
);


export const authSlice = createSlice({
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
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        // state.error = action.error;
        state.error = action.payload;
      })
      .addCase(SignOutUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(SignOutUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null
      });
  },
});

export const { increment } = authSlice.actions;

export const selectLoggedInUser =(state)=>state.auth.loggedInUser

export default authSlice.reducer;
