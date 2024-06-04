import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { profileReducer } from "./profile-reducer";
import { messageReducer } from "./message-reducer";
import { sidebarReducer } from "./sidebar-reducer";

const reducers = combineReducers({
  profilePage: profileReducer,
  messagePage: messageReducer,
  sidebar: sidebarReducer
})

export const store = configureStore({
  reducer: reducers

});