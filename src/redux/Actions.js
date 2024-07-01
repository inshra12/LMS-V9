import axios from "axios";
import {
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  FETCH_BOOK_SUCCESS,
  FETCH_BOOK_FAILURE,
  succeeded,
  FETCH_ALL_BOOKS_FAILURE,
  SIGNUP,
  LOGIN,
  LOGOUT,
} from "./types";
const PROXY_URL = 'https://corsproxy.io/?'; // or your custom proxy URL

export const signup = (user) => ({
  type: SIGNUP,
  payload: user,
});

export const login = (credential) => ({
  type: LOGIN,
  payload: credential,
});

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

//fetchBooks
export const fetchBooks = (query) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${PROXY_URL}https://www.goodreads.com/search/index.xml?key=FtRVHgmjzjpzKjCt3SUMw&q=${query}`
    );
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, "application/xml");
    const works = xmlDoc.getElementsByTagName("work");

    const books = Array.from(works).map((work) => {
      const bestBook = work.getElementsByTagName("best_book")[0];
      const id = bestBook.getElementsByTagName("id")[0].textContent;
      const title = bestBook.getElementsByTagName("title")[0].textContent;
      const author = bestBook
        .getElementsByTagName("author")[0]
        .getElementsByTagName("name")[0].textContent;

      return {
        id,
        title,
        author,
      };
    });

    dispatch({
      type: FETCH_BOOKS_SUCCESS,
      payload: books,
    });
  } catch (error) {
    dispatch({
      type: FETCH_BOOKS_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchBookDetails = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${PROXY_URL}https://www.goodreads.com/book/show/${id}?key=FtRVHgmjzjpzKjCt3SUMw`
    );
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, "application/xml");

    const book = {
      id: xmlDoc.getElementsByTagName("id")[0].textContent,
      imageUrl: xmlDoc.getElementsByTagName("image_url")[0].textContent,
      title: xmlDoc.getElementsByTagName("title")[0].textContent,
      author: xmlDoc
        .getElementsByTagName("author")[0]
        .getElementsByTagName("name")[0].textContent,
      rating: xmlDoc.getElementsByTagName("average_rating")[0].textContent,
      description: xmlDoc.getElementsByTagName("description")[0].textContent,
    };

    dispatch({
      type: FETCH_BOOK_SUCCESS,
      payload: book,
    });
  } catch (error) {
    dispatch({
      type: FETCH_BOOK_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchAllBooks = (query, page) => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `${PROXY_URL}https://www.goodreads.com/search/index.xml?key=FtRVHgmjzjpzKjCt3SUMw&q=${query}+&page=${page}`
    );

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, "application/xml");
    const works = xmlDoc.getElementsByTagName("work");

    const books = Array.from(works).map((work) => {
      const bestBook = work.getElementsByTagName("best_book")[0];
      const id = bestBook.getElementsByTagName("id")[0].textContent;
      const title = bestBook.getElementsByTagName("title")[0].textContent;
      const author = bestBook
        .getElementsByTagName("author")[0]
        .getElementsByTagName("name")[0].textContent;
      const imageUrl =
        bestBook.getElementsByTagName("image_url")[0].textContent;

      return {
        id,
        title,
        author,
        imageUrl,
      };
    });

    const existingBooks = getState().bookData.books;
    const allBooks = [...existingBooks, ...books];

    dispatch({
      type: succeeded,
      payload: allBooks,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_BOOKS_FAILURE,
      payload: error.message,
    });
  }
};
