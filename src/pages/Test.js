import { useEffect, useState } from 'react';
import axios from 'axios';

function Test() {
  const [hello, setHello] = useState('');
  useEffect(() => {
    axios.get('http://localhost:8010/api/test')
      .then((res) => {
        setHello(res.data);
      });
  }, []);

  return (
    <div className="App">
      백엔드 데이터: {hello}
    </div>
  );
}

export default Test;
