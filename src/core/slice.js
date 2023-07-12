import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'cache',
  initialState: {
    server: false, // отвечает ли сервер
    login: false, // зарегистрирован ли пользователь
    needReload: false, // нужно ли запросить данные
    cubes: [], // данные о кубах
    liked: [], // лайкнутые кубы
  },
  reducers: {
    setServer: (state, action) => {
      state.server = action.payload
    },
    setLogin: (state, action) => {
      state.login = action.payload
    },
    saveCubes: (state, action) => {
      state.cubes = action.payload
    },
    saveLiked: (state, action) => {
      state.liked = action.payload
    },
    setReload: (state, action) => {
      state.needReload = action.payload
    },
  },
})

export const { saveCubes, saveLiked, setReload, setLogin, setServer,  } = counterSlice.actions

export default counterSlice.reducer