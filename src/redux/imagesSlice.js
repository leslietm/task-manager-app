import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchImages = createAsyncThunk('images/fetchImages', async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=20');
      return response.data;
    } catch (error) {
      // Esto permite que Redux maneje el error como estado 'rejected'
      throw new Error('Error al cargar las imágenes');
    }
  });

const imagesSlice = createSlice({
  name: 'images',
  initialState: { data: [], viewed: {}, status: 'idle' },
  reducers: {
    toggleViewed: (state, action) => {
      const id = action.payload;
      state.viewed[id] = !state.viewed[id];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchImages.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { toggleViewed } = imagesSlice.actions;
export default imagesSlice.reducer;