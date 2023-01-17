import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';


const App = () => {

  const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

  const [word, setWord] = useState("a")


  const getWord = async (word) => {
    console.log({ curentURL: `${URL}${word}` });
    const response = await fetch(`${URL}${word}`);
    const data = await response.json();
    console.log(data);
    return data

  }

  useEffect(() => {
    getWord(word)
  }, [word])

  return (
    <div className="App">
      <header className="header">

      </header>
      <div className='container'>
        {/* <input type='text' /> */}

        {/* SEARCH BAR  */}
        {/* https://mdbootstrap.com/docs/standard/forms/search/ */}

        {/* https://react-icons.github.io/react-icons/icons?name=fa */}
        <div className="input-group">
          <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={(e) => setWord(e.target.value)} />
          <button type="button" className="btn btn-outline-primary">
            <FaSearch />
          </button>
        </div>

        <h1>{word}</h1>




      </div>

    </div>
  );
}

export default App;
