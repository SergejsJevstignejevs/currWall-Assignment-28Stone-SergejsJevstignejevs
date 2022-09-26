import { useCallback } from "react";

export default function useHttp(){

    const request = useCallback(async (url, method = 'GET', body = null, headers = {"Content-Type": "application/json"}) => {

        try{

            const response = await fetch(url, {method, body, headers});

            if(!response.ok) {

                throw new Error(`Couldn't fetch ${url}, status: ${response.status}`);

            }

            const data = await response.json();

            return data;

        }
        catch(error){

            throw error;

        }

    }, []);

    return {request};

}