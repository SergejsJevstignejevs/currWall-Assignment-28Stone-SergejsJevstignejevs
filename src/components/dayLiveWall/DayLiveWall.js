import './DayLiveWall.scss';

export default function DayLiveWall(props) {

  const { data } = props;
  const elements = data?.map((elem, i)=> {

    return(

      <p key={i}>
        <span 
          className="left">
          {elem.label}:
        </span> 
        <span 
          className="right">
          {elem.info}
        </span>
      </p>

    );
    
  });

  return (
    <div className="DayLiveWall">
      <div className="DayLiveWall__rates">
        {
          data.length !== 0 ? 
            elements :
            <>
              <div className="initial">
                Enter Currency Pair!
              </div>
              <span className="arrowDown">&darr;</span>
            </>
        }
      </div>
    </div>
  );
}
