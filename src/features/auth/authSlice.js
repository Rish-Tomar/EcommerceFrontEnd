import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkIfLoggedIn, createUser,loginUser, SignOutUser} from './authAPI';
import { updateUser } from '../user/userAPI';

const initialState = {
  loggedInUserToken:null,
  userChecked:false,
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

export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (loginInfo,{rejectWithValue}) => {
   try{
    const response = await loginUser(loginInfo);
    return response.data;
   }catch(error){
    console.log(error)
    return rejectWithValue(error)
   }
  }
);

export const checkIfCurrentlyLoggedInAsync = createAsyncThunk(
  'user/checkIfCurrentlyLoggedInUser',
  async () => {
   try{
    const response = await checkIfLoggedIn();
    return response.data;
   }catch(error){
    console.log('user/check logged in',error)
    // return rejectWithValue(error)
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
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        // state.error = action.error;
        state.error = action.payload;
      })
      .addCase(SignOutUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(SignOutUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null
      })
      .addCase(checkIfCurrentlyLoggedInAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkIfCurrentlyLoggedInAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload
        state.userChecked = true
      })
      .addCase(checkIfCurrentlyLoggedInAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.userChecked = true
      });
  },
});

export const { increment } = authSlice.actions;

export const selectLoggedInUser =(state)=>state.auth.loggedInUserToken
export const selectUserChecked  =(state)=>state.auth.userChecked

export default authSlice.reducer;
