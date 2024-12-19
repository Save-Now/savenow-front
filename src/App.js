import { useEffect, useState } from "react";
import axios from "axios";
import theme from "./styles/theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyPage from "./pages/MyPage";
import SignUp from "./pages/SignUp";
import Login from './pages/Login';
import Test from './pages/Test';
import Dashboard from './pages/Dashboard';
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/test" element={<Test />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
        <SignUp />
      </ThemeProvider>
    </>
  );
}

export default App;