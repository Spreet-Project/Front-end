import { configureStore } from '@reduxjs/toolkit';

import post from '../modules/postSlice';
// import visibil from "../modules/visibilSlcie";

const store = configureStore({
  reducer: { post },
});

export default store;
