import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';


const App = () => {

  const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

  const [word, setWord] = useState("");
  const [searchMeaningTerm, setSearchMeaningTerm] = useState("")
  const [meaning, setMeaning] = useState([]);


  const getWord = async (word) => {

    try {
      console.log('Loading...');
      const response = await fetch(`${URL}${word}`);
      console.log(response);
      const data = await response.json();
      // data.map( d =>{
      //   const { meanings, phonetics, word } = d;
      //   return word
      // })
      console.log(data);
      setMeaning(data)
      return meaning;
    } catch (error) {
      console.error(error);
      throw error;
    }



  }

  // my solution is to create and function and then set the setnameofword(word), that should be a better option, we should call this search term
  useEffect(() => {
    getWord(word)
    console.log(typeof meaning, "HEREEEEEEEEEEE");
  }, [word])


  const handleWord = (e) => {
    console.log(e);

    // console.log(word);
  }



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
          <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={(e) => setWord(e.target.value)} value={word} name="searchMeaningTerm" />
          {/* (e) => setWord(e.target.value) */}
          <button type="submit" onSubmit={handleWord} className="btn btn-outline-primary">
            <FaSearch />
          </button>
        </div>


        <h1>{word}</h1>

        <div>

          {meaning && meaning.map(mean => {
            const { meanings, phonetics, word } = mean;

            return (
              <>
                {phonetics.map(phonetic => {
                  const { text, audio } = phonetic
                  return (
                    <>
                      <h4> {text} </h4>
                      <p> {audio}</p>
                    </>
                  )
                })}

              </>
            )
          })}

        </div>



      </div>

    </div>
  );
}

export default App;
