import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import changeState from "./change-state";
import setSearchTerm from './search-term';

export default combineReducers({
  auth,
  message,
  changeState,
  search: setSearchTerm,
});
