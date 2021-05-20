import {
  SEARCHING,
} from "../actions/types";

const initialState = {
  searchTerm: ''
};

const changeSearch = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case SEARCHING:
      return {...state, ...rest }
    default:
      return state
  }
};

export default changeSearch;
