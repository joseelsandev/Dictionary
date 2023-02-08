import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlay, FaHandPointUp } from 'react-icons/fa';
// import FirstLetterToUpperCase from './FirstLetterToUpperCase.js';


const App = () => {

  const URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

  const [word, setWord] = useState("");
  const [searchMeaningTerm, setSearchMeaningTerm] = useState("")
  const [meanings, setMeanings] = useState('');
  const [errorMsg, setErrorMsg] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)



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
    if (word) {
      getWord(word)
    }

    
    // console.log(typeof meanings, "HEREEEEEEEEEEE");
  }, [word])


  const handleWord = (e) => {
    e.preventDefault();
    // setWord("")
    // setErrorMsg("")
    if (searchMeaningTerm) {
      setWord(searchMeaningTerm)
    }

    setErrorMsg("Nothing to Search")
    // console.log({ word });
    // console.log("youve cliciked");

    // console.log(word);
  }

  // audio is reproduting multiple times
  const handlePlay = (play) => {

    const sound = new Audio(play)
    // sound.play()
    console.log("AUDIO WORK");


    if (!isPlaying) {

      setIsPlaying(true)
      sound.play()

      sound.addEventListener("ended", () => {
        // sound.currentTime = 0
        setIsPlaying(false)

      })
    }



  }

  const FirstLetterToUpperCase = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  return (
    <div className="App">
      <header className="header">

      </header>
      <div className='dictionary-container'>
        {/* <input type='text' /> */}

        {/* SEARCH BAR  */}
        {/* https://mdbootstrap.com/docs/standard/forms/search/ */}

        {/* https://react-icons.github.io/react-icons/icons?name=fa */}

        <div className='container-form'>
          <form className="input-group">
            <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={(e) => setSearchMeaningTerm(e.target.value)} value={searchMeaningTerm} name="searchMeaningTerm" />

            <button type="submit" onClick={handleWord} className="btn btn-outline-primary btn-submit">
              <FaSearch />
            </button>
          </form>
        </div>



        {/*  this code makes first letter upper case */}
        {/* https://flexiple.com/javascript/javascript-capitalize-first-letter/ */}
        {/* <h1> <FirstLetterToUpperCase word={word} /> </h1> */}


        <div>
          <h1> {FirstLetterToUpperCase(word)} </h1>
          {errorMsg && <p className='errorMsg'>{errorMsg}</p>}

          {meanings && meanings.map(meaning => {
            // console.log("FINEEEEEEEEE");
            // console.log(meaning);


            const { meanings, phonetics, word, sourceUrls } = meaning;
            // console.log(meanings, "meanin");
            // console.log(phonetics);
            console.log({ meaning });

            return (
              <>
                <div className='underline'>
                  <a href={sourceUrls} target="_blank" key={sourceUrls} className="source-file">
                    <div className="source-link" >Click Here to View Source</div>
                  </a>

                  {/* <h1>{word}</h1> */}
                  {/* phonetics such as how the make sound comes here */}
                  {phonetics.map(phonetic => {
                    const { text, audio } = phonetic
                    return (
                      <>

                        {audio && <>
                          <div className='audio'>
                            <h3 key={text} className="inline"> {text}   </h3>
                            <FaPlay onClick={() => handlePlay(audio)} key={audio} className="play" />
                          </div>


                        </>}
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
                    // console.log({ synonyms });
                    // console.log({ antonyms });
                    // console.log({ meaning });


                    // console.log({ meaning });
                    return <>
                      <h3> {FirstLetterToUpperCase(partOfSpeech)}</h3>
                      {definitions.map(definition => {
                        // console.log(definition, "DEFFFFFFFFF");
                        //  const {definition} = definition
                        return <>
                          <p key={definition.definition}>{definition.definition}</p>
                        </>
                      })}
                      {/* antonyms */}
                      <h3 className='antonym-title'>Antonym </h3>
                      {antonyms && antonyms.length > 0 && antonyms.map(antonym => {
                        // console.log({ antonym });

                        return <>

                          <span className='antonym-item' key={antonym}>{antonym + ", "}</span>
                        </>


                      }) || <p>No Antonym was found</p>}



                      {/* synonyms */}
                      <h3 className='synonyms-title' > Synonyms</h3>
                      {synonyms && synonyms.length > 0 ? <>
                        {/* console.log({synonyms}); */}
                        {synonyms.map(synonym => {
                          return <>
                            <span className='synonym-item' key={synonym}>{synonym + ", "}</span>
                          </>

                        })}
                      </> : <>
                        <p>No Synonym was found</p>
                      </>
                      }

                    </>



                  })}
                </div>
              </>
            )
          })}
        </div>



      </div>

    </div>
  );
}

export default App;
