async function getDashboardData(query) {
    
    try {
        const cityResponse = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`);
        const city = await cityResponse.json();
        
        const weatherResponse = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`);
        const weather = await weatherResponse.json();
    
        const airportResponse = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`);
        const airport = await airportResponse.json();
    
    
        const [citta, meteo, aeroporto] = await Promise.allSettled([city, weather, airport]);
    
        console.log(citta, meteo, aeroporto);

        // BONUS 1 (fatto guardando la soluzione)
        return {
            "city": citta[0]?.name ?? null,
            "country": citta[0]?.country ?? null,
            "temperature": meteo[0]?.temperature ?? null,
            "weather": meteo[0]?.weather_description ?? null,
            "airport": aeroporto[0]?.name ?? null
        };
    } catch(error) {
        throw new Error(`Non riesco a recuperare i dati! ${error.message}`)
    };
};

(async () => {
    try {
        const data = await getDashboardData('vienna');
    
        console.log('Dasboard data:', data);
        let frase = ``;
        if (data.city && data.country) {
            frase += `${data.city} is in ${data.country}.\n`
        }
        if (data.temperature && data.weather) {
            frase += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`
        }
        if(data.airport) {
            frase += `The main airport is ${data.airport}.\n`
        }
        console.log(frase);
    } catch(error) {
        console.error(error);
    };
})();