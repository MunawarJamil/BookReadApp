import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

function parseBooksFromXML(xmlText) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "application/xml");

  // Extract the list of books from the XML structure
  const books = [];
  const results = xmlDoc.querySelectorAll(
    "GoodreadsResponse search results work"
  );
  results.forEach((work) => {
    const book = {
      id: work.querySelector("id")?.textContent,
      title: work.querySelector("best_book title")?.textContent,
      author: work.querySelector("best_book author name")?.textContent,
      imageUrl: work.querySelector("best_book image_url")?.textContent,
      rating: work.querySelector("average_rating")?.textContent,
      description: "Description not available", // Default description
    };
    books.push(book);
  });

  return books;
}

const initialState = {
  entities: [],
  loading: false,
  error: null,
  nextPage: 1,
};

export const incrementPage = () => (dispatch, getState) => {
  const { nextPage } = getState().books; // Get current nextPage value from state
  dispatch(getBooks(nextPage)); // Dispatch getBooks action with incremented page value
};

export const getBooks = createAsyncThunk("booksData", async (pages) => {
  const query = 15;
  const res = await fetch(
     
    `https://www.goodreads.com/search/index.xml?key=FtRVHgmjzjpzKjCt3SUMw&q=${query}+&page=${pages}`
  );

  console.log(res); 
  const xmlText = await res.text();  
  const books = parseBooksFromXML(xmlText);  
 
  return books;
});

export const BooksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBooks.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.entities = [...state.entities, ...payload];
        state.nextPage++; // Increment nextPage after successful fetch
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const booksReducer = BooksSlice.reducer;
