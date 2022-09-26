import useHttp from "./http.hook"

export default function useForexService(){

    const { request } = useHttp();

    const _apiBase = "https://financialmodelingprep.com/api/v3/fx";
    const _apiKey = "a77c9c7342f15053304e639d072acaf3";

    const getCurrencyPairRates = async (currPair) => {

        const response = await request(`${_apiBase}/${currPair}?apikey=${_apiKey}`);
        return _transformRates(response[0]);

    }

    const getCurrencyPairs = async () => {

        const response = await request(`${_apiBase}?apikey=${_apiKey}`);
        return _transformFullData(response);

    }

    const _transformRates = (curreciesRates) => {

        return [
            {
                label: "Currency Pair",
                info: curreciesRates.ticker
            },
            {
                label: "Bid",
                info: curreciesRates.bid
            },
            {
                label: "Ask",
                info: curreciesRates.ask
            },
            {
                label: "Open",
                info: curreciesRates.open
            },
            {
                label: "Day Low",
                info: curreciesRates.low
            },
            {
                label: "Day High",
                info: curreciesRates.high
            },
            {
                label: "Changes",
                info: curreciesRates.changes.toFixed(6)
            },
            {
                label: "Date",
                info: new Date(curreciesRates.date)
                        .toLocaleString(
                            'en-US', 
                            {
                                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
                            }
                        ) + " EST"
            }
        ]

    }

    const _transformFullData =  (data) => {

        return data.map(elem => {

            return {

                currencyPair: elem.ticker

            }

        })

    }

    return { getCurrencyPairRates, getCurrencyPairs };

}