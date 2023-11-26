import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [testBackend, setTestBackend] = useState("Loading backend");

  useEffect(() => {
    // fetch('/api/test/').then(res => res.text())
    fetch('/api/test/').then(res => {
      console.log('res:', res);
      return res.json();
    })
    .then(json => {
      const {test} = json;
      console.log('test:', test);
      setTestBackend(test);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello karen :3
        </p>
        <p>
          {testBackend}
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
