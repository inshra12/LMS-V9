import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import Signup from './component/signup/Signup';
import Login from './component/LoginPage/LoginPage';
import HomePage from './component/homePage/HomePage';
import BookList from './bookList/BookList'
import AllBooks from './component/allBooks/AllBooks';
import Protected from './component/Protected';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
           <Route path="/signup" element={<Signup />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/allBooks/:searchTerm" element={<Protected component={AllBooks} />} />
          <Route path="/book/:id" element={<Protected component={BookList} />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
