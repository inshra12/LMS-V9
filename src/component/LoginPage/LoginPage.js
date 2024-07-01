
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {login} from '../../redux/Actions';
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";


const LoginPage = () => {
  const dispatch=useDispatch();
  const navigate= useNavigate();
  const [input,setInput]=useState({
 email:"",
 password:"",
  });
  

  const currentUser = useSelector((state) => state.bookData.currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.email.trim() === "" || input.password.trim() === "") {
      alert("Please enter both email and password");
      return;
    }
    dispatch(login(input));
    if (currentUser) {
      navigate("/");
    } else {
      alert("Wrong email and password");
    }
  };
  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://i.pinimg.com/564x/83/67/ce/8367ce57781f3f6affa28ff15ca86597.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5" sx={{ color: "#1976d2" }}>
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
               
               <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={input.email}
          onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          value={input.password}
          onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
          label="Password"
          type="password"
          id="password"
        />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LoginPage;
