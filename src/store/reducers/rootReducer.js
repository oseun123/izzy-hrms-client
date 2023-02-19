import userReducer from "./userReducer";
import preferencesReducer from "./preferencesReducer";
import hrReducer from "./hrReducer";
import { combineReducers, createStore } from "redux";
const { REACT_APP_ENV } = process.env;

const rootReducer = combineReducers({
  user: userReducer,
  preferences: preferencesReducer,
  hr: hrReducer,
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
