// src/component/homePage/HomePage.js
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, logout } from "../../redux/Actions";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const books = useSelector((state) => state.bookData.books);
  const isAuthenticated = useSelector(
    (state) => state.bookData.isAuthenticated
  );

  const handleInputChange = (event, value) => {
    setSearch(value);
    if (value) {
      dispatch(fetchBooks(value));
    }
  };

  const handleLoginLogout = () => {
    if (isAuthenticated) {
      dispatch(logout());
    } else {
      navigate("/login");
    }
  };

  const handleOptionSelect = (event, value) => {
    if (value) {
      setSearch(value.title);
      navigate(`/book/${value.id}`);
    }
  };

  const handleClick = () => {
    if (search) {
      navigate(`/allBooks/${search}`);
    }
  };

  const searchBooks = (event) => {
    if (event.key === "Enter") {
      navigate(`/allBooks/${search}`);
    }
  };

  return (
    <Grid container>
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          backgroundImage:
            "url(https://plus.unsplash.com/premium_photo-1698084059435-a50ddfd69303?q=80&w=1850&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Button
            variant="contained"
            href="#contained-buttons"
            onClick={handleLoginLogout}
            sx={{
              bottom: "200px",
              
              backgroundColor: "#484848"
            }}
          >
            {isAuthenticated ? "Logout" : "Login"}
          </Button>
        </Box>

        <Typography
          variant="h4"
          sx={{
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "20px",
            zIndex: 1,
          }}
        >
          Find Your Book of Choice
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Autocomplete
            id="combo-box-demo"
            options={books}
            getOptionLabel={(option) => `${option.title} by ${option.author}`}
            onInputChange={handleInputChange}
            onChange={handleOptionSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Search..."
                onKeyPress={searchBooks}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  width: "300px",
                  marginBottom: "20px",
                  zIndex: 1,
                }}
              />
            )}
          />
        </Box>
      </Box>
    </Grid>
  );
};

export default HomePage;
