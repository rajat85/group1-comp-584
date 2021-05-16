import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import changeState from "./change-state";

export default combineReducers({
  auth,
  message,
  changeState,
});
