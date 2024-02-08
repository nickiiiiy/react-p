import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности(DESC)",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      console.log(action);
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },

    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   count: 0,
// };

// export const counterSlice = createSlice({
//   name: "filter",
//   initialState: initialState,
//   reducers: {
//     increment: (state) => {
//       state.count += 1;
//     },
//     decrement: (state) => {
//       state.count -= 1;
//     },
//     incrementByAmount: (state, action) => {
//       state.count += action.payload;
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// export default counterSlice.reducer;
