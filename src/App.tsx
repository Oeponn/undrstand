import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

interface TestResponse {
  test: string,
  status: number,
}

function App() {
  const [testBackend, setTestBackend] = useState(0);

  useEffect(() => {
    // fetch('/api/test/').then(res => res.text())
    fetch('/api/test/').then(res => {
      console.log('res:', res);
      return res.json();
    })
    .then(json => {
      const {test} = json;
      setTestBackend(test);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello user {testBackend}. Edit <code>src/App.tsx</code>.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
