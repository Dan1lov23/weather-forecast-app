async function main() {
    const cityName = document.getElementById("cityInput").value;
    document.getElementById("city").innerHTML = cityName;
    try {
        const cityUrl = `https://nominatim.openstreetmap.org/search?q=${cityName}&format=json`;
        const cityResponse = await fetch(cityUrl);
        const cityData = await cityResponse.json();
        const lat = cityData[0].lat;
        const lon = cityData[0].lon;

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        const response = await fetch(url);

        const data = await response.json();
        const temp = data.current_weather.temperature;
        const windiSpeed = data.current_weather.windspeed;
        const interval = data.current_weather.interval;
        document.getElementById('temp').innerHTML = temp;
        document.getElementById('windSpeed').innerHTML = windiSpeed;
        document.getElementById('interval').innerHTML = interval;
    } catch (e) {
        console.log("Ошибка соединения с сервером")
    }
}

let check = 0;

function themeChange() {
    const body = document.body;
    if (check % 2 === 0) {
        body.style.backgroundColor = 'black';
    } else {
        body.style.backgroundColor = 'white';
    }
    check++;
}
