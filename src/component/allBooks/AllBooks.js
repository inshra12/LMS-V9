// src/component/allBooksPage/AllBooks.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllBooks } from "../../redux/Actions";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  Box,
  Button,
  Typography,
  Grid,
  CircularProgress,
  List,
  ListItem,
  Divider,
  ListItemText,
} from "@mui/material";
import { Waypoint } from "react-waypoint";
import { useNavigate } from "react-router-dom";

const AllBooks = () => {
  const { searchTerm } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const books = useSelector((state) => state.bookData.books);
  const Back = () => {
    navigate("/");
  };

  const handleEnter = () => {
    console.log("bottom of page");
    setPage(page + 1);
    dispatch(fetchAllBooks(searchTerm, page));
  };

  useEffect(() => {
    if (searchTerm) {
      dispatch(fetchAllBooks(searchTerm, page));
    }
  }, [dispatch, searchTerm, page]);

  return (
    <>
      <Box sx={{ margin: "10px", display: "flex" }}>
      
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
     <Typography variant="h6" gutterBottom
       sx={{
       marginLeft:"40%",
       marginTop:"10px"
      }}>
          Search Results for {searchTerm}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {books.map((book) => (
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={book.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      by {book.author}
                    </Typography>
                 
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        ))}

        <Waypoint onEnter={handleEnter}>
          <div>
            <Grid
              container
              spacing={1}
              justify="center"
              direction="row"
              align="center"
            >
              <Grid item xs={10} lg={8}>
                <CircularProgress />
              </Grid>
            </Grid>
          </div>
        </Waypoint>
      </Box>
    </>
  );
};

export default AllBooks;
