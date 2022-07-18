import userReducer from "./userReducer";
// import todoReducer from "./todoReducer";
import { combineReducers, createStore } from "redux";
const { REACT_APP_ENV } = process.env;

const rootReducer = combineReducers({
  user: userReducer,
  //   todo: todoReducer,
});
let store;
if (REACT_APP_ENV === "development") {
  store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  store = createStore(rootReducer);
}

export default store;
