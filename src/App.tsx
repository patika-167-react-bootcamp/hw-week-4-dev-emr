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
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const [user, setUser] = useState(false);
  const [token, setToken] = useState();
  return (
    <>
      <Router>
        <Navbar user={user} logout={() => setUser(false)} />

        <Routes>
          {!user && (
            <>
              <Route
                path="/login"
                element={
                  <SignIn
                    authenticate={() => setUser(true)}
                    setToken={setToken}
                  />
                }
              />

              <Route
                path="/register"
                element={
                  <SignUp
                    authenticate={() => setUser(true)}
                    setToken={setToken}
                  />
                }
              />
            </>
          )}
          {user && (
            <>
              <Route path="/todos" element={<TodoPage token={token} />} />
              <Route
                path="/editstatus/:id"
                element={<EditStatus token={token} />}
              />
              <Route
                path="/editcategory"
                element={<EditCategories token={token} />}
              />
            </>
          )}
          <Route
            path="*"
            element={<Navigate to={user ? "/todos" : "/login"} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
