import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "bSjbBobH6piG4ui5d9H9hhZSwsofEvcs29NpfCIsU8ppmuCe";

// Fetch Books
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async () => {
    const response = await fetch(
      `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${API_KEY}`
    );
    const data = await response.json();
    return data.results.books; // direct books array
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: null,
    sortBy: "title",
    sortOrder: "asc",
  },
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSortBy, setSortOrder } = booksSlice.actions;
export default booksSlice.reducer;