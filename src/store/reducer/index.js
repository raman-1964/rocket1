import { combineReducers } from "redux";
import { emailReducer } from "./emailReducer";

const rootReducer = combineReducers({
  emailReducer,
});

export default rootReducer;
