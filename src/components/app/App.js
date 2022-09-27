import DayLiveWall from '../dayLiveWall/DayLiveWall';
import SearchInput from '../searchInput/SearchInput';
import SearchButton from '../searchButton/SearchButton';
import CurrencyPairsDetails from '../currencyPairsDetails/CurrencyPairsDetails';

import useForexServise from "../../hooks/forexService.hook";

import './App.scss';
import { useEffect, useState, useRef } from 'react';

export default function App() {

  const inputRef = useRef(null);
  const [incorrectInput, setIncorrectInput] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [intervalId, setIntervalId] = useState(null);
  const [initalRender, setInitalRender] = useState(true);

  const [currencyPair, setCurrencyPair] = useState({data: ""});
  const [currencyPairRates, setCurrencyPairRates] = useState([]);

  const regex = new RegExp("^[a-zA-Z0-9]{3,6}\/?[a-zA-Z]{3}$");

  const { process, setProcess, getCurrencyPairRates } = useForexServise();

  const fetchData = (currencyPair) => {

    setProcess("loading");
    getCurrencyPairRates(currencyPair.data.replace("/", ""))
    .then((data) => {
      setIncorrectInput(false);
      setInvalidInput(false);
      setCurrencyPairRates(data);
      setProcess("success");
    })
    .catch(() => {
      setInvalidInput(true);
      setIncorrectInput(true);
      setProcess("error");
    });

  }

  useEffect(() => {

    setInitalRender(false);

  }, []);

  useEffect(() => {

    if(!initalRender){

      setProcess("loading");

      if(!regex.test(currencyPair.data)){

        setProcess("error");
        setIncorrectInput(true);
        setInvalidInput(false);
        inputRef.current.focus();
  
      }
      else {

        if(intervalId === null) {

          fetchData(currencyPair);
          let idInterval = setInterval(() => {
            fetchData(currencyPair)
          }, 5000);

          setIntervalId(idInterval);

        }
        else {

          clearInterval(intervalId);

          setIntervalId(null);

          fetchData(currencyPair);
          let idInterval = setInterval(() => {
            fetchData(currencyPair)
          }, 5000);

          setIntervalId(idInterval);

        }

      }

    }

    return () => {

      clearInterval(intervalId);

    }

  }, [currencyPair]);

  return (
    <div className="App">
      <DayLiveWall 
        data={currencyPairRates}
        process={process}/>
      <SearchInput 
        inputValue={inputValue} 
        setInputValue={setInputValue} 
        incorrectInput={incorrectInput}
        invalidInput={invalidInput}
        inputRef={inputRef}/>
      <SearchButton 
        inputValue={inputValue} 
        setCurrencyPair={setCurrencyPair}
        incorrectInput={incorrectInput}/>
      <CurrencyPairsDetails
        setInputValue={setInputValue}/>
    </div>
  );

}
