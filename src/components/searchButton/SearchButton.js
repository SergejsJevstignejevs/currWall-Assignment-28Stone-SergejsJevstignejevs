
import './SearchButton.scss';

export default function SearchButton(props) {
  return (
    <button 
      className="SearchButton"
      type="submit"
      onClick={() => {
        
        props.setCurrencyPair({data: props.inputValue});
        console.log("tick");
        if(!props.incorrectInput){

          document.getElementById("searchInput").classList.remove("error");

        }
        
      }}>
        Search Rates
    </button>
  );
}
