<<<<<<< HEAD
import { useEffect, useState } from "react";
import axios from "axios";
import theme from "./styles/theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyPage from "./pages/MyPage";
import SignUp from "./pages/SignUp";
import { ThemeProvider } from "styled-components";
=======
>>>>>>> 50be831 (Revert "커밋 이정원")

function App() {

  return (
<<<<<<< HEAD
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
    <div className="App">
    </div>
>>>>>>> 50be831 (Revert "커밋 이정원")
  );
}

export default App;