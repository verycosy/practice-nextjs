import { configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import todo from "./todo";

const rootReducer = combineReducers({
  todo: todo.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

declare module "react-redux" {
  interface DefaultRootState extends RootState {}
}

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };

    if (state.count) nextState.count = state.count;

    return nextState;
  }

  return rootReducer(state, action);
};

const initStore = () => {
  return configureStore({
    reducer,
    devTools: true,
  });
};

export const wrapper = createWrapper(initStore);
