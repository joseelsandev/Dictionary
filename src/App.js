import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlay } from 'react-icons/fa';


const App = () => {

  const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

  const [word, setWord] = useState("example");
  const [searchMeaningTerm, setSearchMeaningTerm] = useState("")
  const [meanings, setMeanings] = useState('');
  const [errorMsg, setErrorMsg] = useState('')


  const getWord = async (word) => {
    // console.log('Loading...');
    // const response = await  fetch(`${URL}${word}`);
    // const data = response.json()
    // setMeanings(data)
    // return meanings;


    try {
      console.log('Loading...');
      setErrorMsg('')
      console.log('Error Message was cleaned...');
      setMeanings('')
      console.log('Meaning  was cleaned...');

      const response = await fetch(`${URL}${word}`);
      // console.log(response);
      if (response.ok) {
        const data = await response.json();

        // data.map( d =>{
        //   const { meanings, phonetics, word } = d;
        //   return word
        // })

        setMeanings(data)

        return meanings;
      } else {
        setErrorMsg(`Sorry Nothing was found under ${word}`)
        throw new Error('Api Error: ' + response.status);
      }

    } catch (error) {
      console.error(error);
      throw error;
    }



  }

  // my solution is to create and function and then set the setnameofword(word), that should be a better option, we should call this search term
  useEffect(() => {
    getWord(word)
    // console.log(typeof meanings, "HEREEEEEEEEEEE");
  }, [word])


  const handleWord = (e) => {
    e.preventDefault();
    setWord(searchMeaningTerm)
    // console.log({ word });
    // console.log("youve cliciked");

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

        <form className="input-group">
          <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={(e) => setSearchMeaningTerm(e.target.value)} value={searchMeaningTerm} name="searchMeaningTerm" />

          <button type="submit" onClick={handleWord} className="btn btn-outline-primary">
            <FaSearch />
          </button>
        </form>


        <h1>{word}</h1>

        <div>

          {errorMsg && <p>{errorMsg}</p>}

          {meanings && meanings.map(meaning => {
            // console.log("FINEEEEEEEEE");
            // console.log(meaning);


            const { meanings, phonetics, word } = meaning;
            // console.log(meanings, "meanin");
            // console.log(phonetics);

            return (
              <>
                {/* <h1>{word}</h1> */}
                {/* phonetics such as how the make sound comes here */}
                {phonetics.map(phonetic => {
                  const { text, audio } = phonetic
                  return (
                    <>
                      <h4> {text}  </h4>
                      {audio && <p> <FaPlay /> {audio}</p>}
                    </>
                  )
                })}

                {/* definitions comes here */}
                {meanings.map(meaning => {
                  // console.log(meaning, "ADENTROOOOOOOOOO");

                  const { definitions, partOfSpeech, synonyms, antonyms } = meaning
                  // console.log(antonyms);
                  // console.log({ definitions });
                  // console.log(synonyms, "synonyms0000000");
                  // console.log(antonyms, "antonyms");

                  // console.log({ meaning });
                  return <>
                    <h3>{partOfSpeech}</h3>
                    {definitions.map(definition => {
                      // console.log(definition, "DEFFFFFFFFF");
                      //  const {definition} = definition
                      return <>
                        <p>{definition.definition}</p>
                      </>
                    })}
                    {/* antonyms */}
                    <h4 className='antonym'>Antonym MMG</h4>
                    {antonyms && antonyms.length > 0 && antonyms.map(antonym => {
                      console.log({ antonym });
                      
                        return <>
                        <span className='antonym' key={antonym}>{antonym + ", "}</span>
                      </>
                      
                      
                    }) ||  <div> Nothing FOOOOOOOOOOOOund</div>}


                    {/* <h4>antonyms</h4>
                    {antonyms && antonyms.length > 0 ? <>
                      {antonyms.map(antonym => {
                        <p>{antonym}</p>
                      })}
                    </> : <>
                      <p>No antonym was found </p>
                    </>
                    } */}

                    {/* synonyms */}
                    <h4>synonyms</h4>
                    {synonyms && synonyms.length > 0 ? <>

                      {synonyms.map(synonym => {
                        <p>{synonym}</p>
                      })}
                    </> : <>
                      <p>No synonym was found</p>
                    </>
                    }

                  </>



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
