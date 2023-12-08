import { createStore } from "redux";
import { combineReducers } from "redux";
import crudReducer from "./reducer/crudReducer";

const rootReducer = combineReducers({
  crudReducer,
});

const store = createStore(rootReducer);

export default store;
