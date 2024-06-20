import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { profileReducer } from "./profile-reducer";
import { messageReducer } from "./message-reducer";
import { sidebarReducer } from "./sidebar-reducer";
import { usersReducer } from "./users-reducer";
import { authReducer } from "./auth.reducer";

const reducers = combineReducers({
  profilePage: profileReducer,
  messagePage: messageReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
})

export const store = configureStore({
  reducer: reducers

});