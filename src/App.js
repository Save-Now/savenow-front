<<<<<<< HEAD
import { useEffect, useState } from "react";
import axios from "axios";
import theme from "./styles/theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyPage from "./pages/MyPage";
import SignUp from "./pages/SignUp";
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </Router>
        <SignUp />
      </ThemeProvider>
    </>
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Test from './pages/Test';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
>>>>>>> 3b1d41d (feat: 대시보드 및 구성 컴포넌트 추가, 차트 라이브러리 설치)
  );
}

export default App;