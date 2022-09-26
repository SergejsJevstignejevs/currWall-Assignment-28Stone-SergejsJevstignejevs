

import './SearchInput.scss';

export default function SearchInput(props) {

  const incorrectInputClass = props.incorrectInput ? " error" : "";
  const incorrectInputText = "Incorrectly entered currency pair!";
  const ivalidInputText = "There are no such currency pair!";

  return (
    <>
      <input 
          id="searchInput"
          ref={props.inputRef}
          type="search" 
          className={`SearchInput${incorrectInputClass}`}
          placeholder="Enter currency pair (E.g. EUR/USD)"
          value={props.inputValue}
          onChange={ event => props.setInputValue(event.target.value) }>
      </input>
      {props.incorrectInput ? 
        <p className="errorText">
          {props.invalidInput ?  ivalidInputText : incorrectInputText}
        </p> : 
        null
      }
    </>
  );
}
