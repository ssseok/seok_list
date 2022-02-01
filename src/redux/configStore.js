import dictionary from "./modules/dictionary";
import thunk from "redux-thunk";

import { createStore, combineReducers, applyMiddleware, compose } from "redux";

const roorReducer = combineReducers({ dictionary });

const middlewares = [thunk];
const enhancer = applyMiddleware(...middlewares);

const store = createStore(roorReducer, enhancer);

export default store;
