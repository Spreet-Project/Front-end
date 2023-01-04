import { createSlice } from '@reduxjs/toolkit';
// import { baseURL, instance, subURL } from "../../core/axios/axios";
// import sweetAlert from "../../core/utils/sweetAlert";

const initialState = {
  postList: [],
  detailPost: {},
  isLoading: false,
  error: null,
  isSuccess: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState: initialState,
  reducers: {},
  //   extraReducers: (builder) => {
  // builder.addCase(__getPosts.pending, (state, action) => {
  //   state.isLoading = true;
  //   state.isSuccess = false;
  // });
  // builder.addCase(__getPosts.fulfilled, (state, action) => {
  //   state.postList = action.payload.postList;
  //   state.isLoading = false;
  //   state.isSuccess = true;
  // });
  // builder.addCase(__getPosts.rejected, (state, action) => {
  //   state.isLoading = false;
  //   state.error = action.payload;
  //   state.isSuccess = false
  // }
});

// export const { } = postSlice.actions;

const postReducer = postSlice.reducer;

export default postReducer;
