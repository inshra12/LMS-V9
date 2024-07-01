// src/redux/reducers/bookReducer.js
import {
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  FETCH_BOOK_SUCCESS,
  FETCH_BOOK_FAILURE,
  succeeded,
  FETCH_ALL_BOOKS_FAILURE,
  SIGNUP,
  LOGIN,
  LOGOUT
} from "../types";

const initialState = {

  users: JSON.parse(localStorage.getItem("users")) || [],
  isAuthenticated: false,
  currentUser: null,
  books: [],
  bookDetails: null,
  error: null,
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      const updatedUsers = [...state.users, action.payload];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return {
        ...state,
        users: updatedUsers,
      };
    case LOGIN:
      const user = state.users.find(
        (user) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );
      return {
        ...state,
        isAuthenticated: true,
        currentUser: user || null,
      };
      case LOGOUT:
        return initialState;

    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload,
        error: null,
      };
    case FETCH_BOOKS_FAILURE:
      return {
        ...state,
        books: [],
        error: action.payload,
      };
    case FETCH_BOOK_SUCCESS:
      return {
        ...state,
        bookDetails: action.payload,
        error: null,
      };
    case FETCH_BOOK_FAILURE:
      return {
        ...state,
        bookDetails: null,
        error: action.payload,
      };
    case succeeded:
      return {
        ...state,
        books: action.payload,
        error: null,
      };
    case FETCH_ALL_BOOKS_FAILURE:
      return {
        ...state,
        books: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default bookReducer;
