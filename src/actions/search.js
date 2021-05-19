import {
  SEARCHING,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
  SET_MESSAGE,
} from "./types";

export const search = (data) => ({
  type: SEARCHING,
  ...data,
});