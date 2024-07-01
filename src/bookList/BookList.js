// src/component/bookDetails/BookDetails.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookDetails } from "../redux/Actions";
import { useParams } from "react-router-dom";
import { Container, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const BookList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const book = useSelector((state) => state.bookData.bookDetails);
  const Back = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(fetchBookDetails(id));
  }, [dispatch, id]);

  return (
    <Container>
     <ChevronLeftIcon variant="contained"
        href="#contained-buttons"
        onClick={Back}
        sx={{
        
          backgroundColor: "#484848",
          marginTop: "10px",
          color:"white",
          cursor:"pointer"
        }} >

     </ChevronLeftIcon>
      {book ? (
        <Box sx={{ margin: "50px" }}>
          <img src={book.imageUrl} alt="" />
          <Typography variant="h4">{book.title}</Typography>
          <Typography variant="h6">by {book.author}</Typography>
          <Typography variant="body1">Rating: {book.rating}</Typography>
          <Typography variant="body1"> {book.description}</Typography>
        </Box>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
};

export default BookList;
