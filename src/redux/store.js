import { createStore } from "redux";
import rootReducer from "./reducers";
import { applyMiddleware } from "redux";
import thunk from 'redux-thunk';

export default createStore(rootReducer, applyMiddleware(thunk));
