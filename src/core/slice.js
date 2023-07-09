import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'cache',
  initialState: {
    needReload: false,
    cubes: [],
    liked: [],
  },
  reducers: {
    saveCubes: (state, action) => {
      state.cubes = action.payload
    },
    saveLiked: (state, action) => {
      state.liked = action.payload
    },
    changeReload: (state, action) => {
      state.needReload = action.payload
    },
  },
})

export const { saveCubes, saveLiked, changeReload,  } = counterSlice.actions

export default counterSlice.reducer