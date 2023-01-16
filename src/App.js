import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';



const App = () => {

  const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

  const [word, setWord] = useState("")


  const getWord = (word) => {
    const response = fetch(`${URL}`);


  }

  useEffect(() => {
    getWord(word)
  }, [word])

  return (
    <div className="App">
      <header className="header">

      </header>
      <div className='container'>
        <input type='text' />
        
      </div>

    </div>
  );
}

export default App;
