import { useEffect, useState } from 'react';
import axios from 'axios';
import SignUp from './component/SignUp';

function App() {
  const [hello, setHello] = useState('');
  useEffect(() => {
    axios.get('http://localhost:8080/api/test')
      .then((res) => {
        setHello(res.data);
      }, []);
  })
  return (
    <>
    <SignUp/>
    </>
  );
}

export default App;
