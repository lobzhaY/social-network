import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { profileReducer } from "./profile-reducer";
import { messageReducer } from "./message-reducer";
import { sidebarReducer } from "./sidebar-reducer";
import { usersReducer } from "./users-reducer";

const reducers = combineReducers({
  profilePage: profileReducer,
  messagePage: messageReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
})

export const store = configureStore({
  reducer: reducers

});