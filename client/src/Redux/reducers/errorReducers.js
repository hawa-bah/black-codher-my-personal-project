import { GET_ERRORS } from "../actions/types";

const initialState = {};

export default function foo(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      console.log("ACTIONS", action);
      return action.payload;
    default:
      return state;
  }
}
