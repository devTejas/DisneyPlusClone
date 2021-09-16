import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recommends: null,
  newDisney: null,
  originals: null,
  trending: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.recommends = action.payload.recommends;
      state.newDisney = action.payload.newDisney;
      state.originals = action.payload.originals;
      state.trending = action.payload.trending;
    },
  },
});

export const { setMovies } = movieSlice.actions;

export const selectRecommends = (state: initialState) => state.movie.recommends;
export const selectNewDisney = (state: initialState) => state.movie.newDisney;
export const selectOriginals = (state: initialState) => state.movie.originals;
export const selectTrending = (state: initialState) => state.movie.trending;

export default movieSlice.reducer;

// interface movieState {
//   movie: { movies: [] };
// }

type initialState = {
  movie: {
    recommends: movieDataType;
    newDisney: movieDataType;
    originals: movieDataType;
    trending: movieDataType;
  };
};

type movieDataType = {
  id: string;
  title: string;
  titleImg: string;
  subTitle: string;
  cardImg: string;
  backgroundImg: string;
  description: string;
}[];
