import { useEffect, useState } from 'react';
import useForexService from '../../hooks/forexService.hook';

import './CurrencyPairsDetails.scss';

export default function CurrencyPairsDetails(props) {

    const [currencyPairs, setCurrencyPairs] = useState();
    const { getCurrencyPairs } = useForexService();

    const listElements = currencyPairs?.map((elem, i) => {

        return (

            <li
                key={i}
                onClick={() => props.setInputValue(elem.currencyPair)}>
                {elem.currencyPair}
            </li>

        );

    });

    useEffect(() => {

        getCurrencyPairs()
            .then(setCurrencyPairs);

    }, []);


    return (
        <details className="CurrencyPairsDetails">
            <summary>Show Possible Currency Pairs</summary>
            <ul>
                {listElements}
            </ul>
        </details>
    );
}
