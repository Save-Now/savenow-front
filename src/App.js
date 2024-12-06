import { useEffect, useState } from 'react';
import axios from 'axios';
import SignUp from './component/SignUp';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [hello, setHello] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/test")
      .then((res) => {
        setHello(res.data);
      })
      .catch((error) => {
        // 에러 처리 추가
        console.error("Error:", error)
      });
  }, []); // 의존성 배열을 여기로 이동

  return (
    <>
      <Router>
        <Routes>
          <Route path="/mypage" element={<MyPage />}/>
        </Routes>
      </Router>
      <SignUp />
    </>
  );
}

export default App;
