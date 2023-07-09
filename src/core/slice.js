import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'cache',
  initialState: {
    login: false,
    needReload: false,
    cubes: [],
    liked: [],
  },
  reducers: {
    changeLogin: (state, action) => {
      state.login = action.payload
    },
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

export const { saveCubes, saveLiked, changeReload, changeLogin,  } = counterSlice.actions

export default counterSlice.reducer