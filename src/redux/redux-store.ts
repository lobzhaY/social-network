import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { profileReducer } from "./profile-reducer";
import { messageReducer } from "./message-reducer";
import { sidebarReducer } from "./sidebar-reducer";
import { usersReducer } from "./users-reducer";
import { authReducer } from "./auth.reducer";
import { appReducer } from "./app.reducer";

const reducers = combineReducers({
  profilePage: profileReducer,
  messagePage: messageReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
})

export const store = configureStore({
  reducer: reducers

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type InferActionsTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type ActionsTypeReturn<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<InferActionsTypes<T>>;
