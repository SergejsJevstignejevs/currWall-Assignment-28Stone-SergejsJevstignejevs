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

  const [initalRender, setInitalRender] = useState(true);

  const [currencyPair, setCurrencyPair] = useState({data: ""});
  const [currencyPairRates, setCurrencyPairRates] = useState([]);

  const regex = new RegExp("^[a-zA-Z0-9]{3,6}\/?[a-zA-Z]{3}$");

  const { getCurrencyPairRates } = useForexServise();

  useEffect(() => {

    setInitalRender(false);

  }, []);

  useEffect(() => {

    if(!initalRender){

      if(!regex.test(currencyPair.data)){

        console.log("bad");
        setIncorrectInput(true);
        setInvalidInput(false);
        inputRef.current.focus();
  
      }
      else {
  
        console.log("ok");
        getCurrencyPairRates(currencyPair.data.replace("/", ""))
          .then((data) => {
            setIncorrectInput(false);
            setInvalidInput(false);
            setCurrencyPairRates(data);
          })
          .catch(() => {
            setInvalidInput(true);
            setIncorrectInput(true);
          });
  
      }

    }

  }, [currencyPair]);

  return (
    <div className="App">
      <DayLiveWall 
        data={currencyPairRates}/>
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
