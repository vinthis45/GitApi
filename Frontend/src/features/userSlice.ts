import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from '../features/store';

type User = {
  id: number;
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
};

interface UserState {
  data: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    getUserSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.data = action.payload;
    },
    getUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getUserStart, getUserSuccess, getUserFailure } = userSlice.actions;

export default userSlice.reducer;

export const fetchUser = (username: string): AppThunk => async (dispatch) => {
  try {
    dispatch(getUserStart());
    const response = await axios.get(`http://localhost:5000/api/users/${username}`);
    dispatch(getUserSuccess(response.data));
  } catch (error: any) {
    dispatch(getUserFailure(error.message));
  }
};
