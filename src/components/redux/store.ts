import { createStore } from "redux";
import reducer from "./reducer";
import { AppState } from "./AppState";

export const store = createStore(reducer, new AppState());
