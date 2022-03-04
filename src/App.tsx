import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Components/Navbar/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SignUp from "./Components/Auth/Register/Register";
import LoadingIcon from "./Components/LoadingIcon/LoadingIcon";
import SignIn from "./Components/Auth/Login/Login";
import TodoPage from "./Todo/TodoPage";
import EditCategories from "./Todo/EditCategory/EditCategory";
import EditStatus from "./Todo/EditStatus/EditStatus";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/todos" element={<TodoPage />} />
          <Route path="/editstatus/:id" element={<EditStatus />} />
          <Route path="/editcategory" element={<EditCategories />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
