import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'User',
  initialState: {
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email')
  },
  reducers: {
    userInfo: (state, action) => {
      state.name = action.payload.name
      state.email = action.payload.email.toLowerCase()
    },
    userInLocal: (state, action) => {
      localStorage.setItem('name', action.payload.name)
      localStorage.setItem('email', action.payload.email.toLowerCase())
    },
    logOut: (state) => {
      state.name = ''
      state.email = ''
      localStorage.clear()
    }
  }
})

export const { userInfo, userInLocal, logOut } = userSlice.actions;
export default userSlice.reducer;