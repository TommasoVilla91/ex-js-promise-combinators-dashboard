async function getDashboardData(query) {
    const cityResponse = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${query}`);
    const city = await cityResponse.json();
    
    const weatherResponse = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${query}`);
    const weather = await weatherResponse.json();

    const airportResponse = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${query}`);
    const airport = await airportResponse.json();


    const [citta, meteo, aeroporto] = await Promise.all([city, weather, airport]);

    // console.log(citta[0], meteo[0], aeroporto[0]);    

    return {
        "city": citta[0].name,
        "country": citta[0].country,
        "temperature": meteo[0].temperature,
        "weather": meteo[0].weather_description,
        "airport": aeroporto[0].name
    };
}

(async () => {
    const data = await getDashboardData('london');

    console.log('Dasboard data:', data);
     console.log(
        `${data.city} is in ${data.country}.\n` +
        `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
        `The main airport is ${data.airport}.\n`
    );
})();