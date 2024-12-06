import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyPage from "./pages/MyPage";
import SignUp from "./pages/SignUp";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Router>
      <SignUp />
    </>
  );
}

export default App;