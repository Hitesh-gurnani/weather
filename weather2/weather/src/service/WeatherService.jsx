const API_KEY = '4eb49f9e0bd319626e555cc4482902d8'
const BASE_URL = `https://api.openweathermap.org/data/2.5`


const getWeatherData = (infoType, searchParam) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParam, appid: API_KEY })
    console.log(url)
    return fetch(url)
        .then((res) => res.json())
        .then((data) => data)
}

export default getWeatherData;