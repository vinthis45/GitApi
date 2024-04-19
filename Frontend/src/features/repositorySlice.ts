import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppThunk } from '../features/store';

type Repository = {
  id: number;
  name: string;
  description: string;
  owner?: {
    avatar_url: string;
  };
};

interface RepositoryState {
  data: Repository[];
  loading: boolean;
  error: string | null;
}

const initialState: RepositoryState = {
  data: [],
  loading: false,
  error: null,
};

const repositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    getRepositoriesStart(state) {
      state.loading = true;
      state.error = null;
    },
    getRepositoriesSuccess(state, action: PayloadAction<Repository[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    getRepositoriesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getRepositoriesStart, getRepositoriesSuccess, getRepositoriesFailure } = repositorySlice.actions;

export default repositorySlice.reducer;

export const fetchRepositories = (username: string): AppThunk => async (dispatch) => {
  try {
    dispatch(getRepositoriesStart());
    const response = await axios.get(`http://localhost:5000/api/users/${username}/repos`);
    dispatch(getRepositoriesSuccess(response.data));
  } catch(error: any) {
    dispatch(getRepositoriesFailure(error.message));
  }
};
