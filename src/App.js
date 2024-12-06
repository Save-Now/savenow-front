import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyPage from "./pages/MyPage";

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
        console.error("Error:", error);
      });
  }, []); // 의존성 배열을 여기로 이동

  return (
    <Router>
      {/* <div className="App">백엔드 데이터: {hello}</div> */}
      <Routes>
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;