"use client";

import { useState } from "react";

import axios from "axios"; 
import {
  Button,
  TextField,
  Box,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@mui/material";

import Image from "next/image";
import img1 from "../../assets/img1.jpg"; 
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    //  form validation
    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);

      // API request to backend
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        fullName,
        email,
        password,
      });

      setSuccessMessage("Registration successful! 🎉");
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ flex: 1, position: "relative" }}>
        <Image src={img1} alt="Sign Up" fill style={{ objectFit: "cover" }} />
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 4,
          borderRadius: "30px 0px 0px 30px"
        }}
      >
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <Typography variant="h1" sx={{ fontSize: "39px", textAlign: "center", color: "#FF7043" }}>
            Welcome
          </Typography>
          <Typography variant="h6" sx={{ fontFamily: "Poppins", textAlign: "center", color: "#000000" }}>
            Register with us today
          </Typography>

          <Box className="space-y-4">
            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="h6" sx={{ fontFamily: "Poppins", color: "#000000", marginBottom: "0.5rem" }}>
                Full Name
              </Typography>
              <TextField
                placeholder="Enter Your Full Name"
                variant="outlined"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                fullWidth
                sx={{ "& .MuiOutlinedInput-root": { paddingLeft: "1rem", borderRadius: "15px" } }}
                InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }}
              />
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="h6" sx={{ fontFamily: "Poppins", color: "#000000", marginBottom: "0.5rem" }}>
                Work Email
              </Typography>
              <TextField
                placeholder="Enter Your Work Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                type="email"
                sx={{ "& .MuiOutlinedInput-root": { paddingLeft: "1rem", borderRadius: "15px" } }}
                InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> }}
              />
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="h6" sx={{ fontFamily: "Poppins", color: "#000000", marginBottom: "0.5rem" }}>
                Choose Password
              </Typography>
              <TextField
                placeholder="Choose Your Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                type="password"
                sx={{ "& .MuiOutlinedInput-root": { paddingLeft: "1rem", borderRadius: "15px" } }}
                InputProps={{ startAdornment: <InputAdornment position="start"><HttpsIcon /></InputAdornment> }}
              />
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Typography variant="h6" sx={{ fontFamily: "Poppins", color: "#000000", marginBottom: "0.5rem" }}>
                Confirm Password
              </Typography>
              <TextField
                placeholder="Confirm Your Password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                type="password"
                sx={{ "& .MuiOutlinedInput-root": { paddingLeft: "1rem", borderRadius: "15px" } }}
                InputProps={{ startAdornment: <InputAdornment position="start"><HttpsIcon /></InputAdornment> }}
              />
            </Box>

           
            {errorMessage && (
              <Typography sx={{ color: "red", textAlign: "center", fontSize: "14px" }}>
                {errorMessage}
              </Typography>
            )}
            {successMessage && (
              <Typography sx={{ color: "green", textAlign: "center", fontSize: "14px" }}>
                {successMessage}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              sx={{
                padding: "10px 20px",
                backgroundColor: "#FF7043",
                marginTop: "1rem",
                borderRadius: "10px",
                transition: "0.3s",
                "&:hover": { backgroundColor: "#ff5722" },
              }}
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Register"}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
