// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FNew_York


export function getWeather(lat, lon, timezone) {

    // deciding to put the api's url into a const so that i can easily call it in my fetch request later in the function, that way I can assign the variables to the url spots before the function runs its course.

    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}2&longitude=${lon}&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=${timezone}`

    var lat;
    var lon;
    var timezone;

    // I was having a lot of trouble with throwing in the URL, because it would always show the default latitude, longitude, and timezone. so using backtics and template literals i was able to plug in lariables that my function asks to call when run.

    return fetch(apiUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        // we are taking that data and creating 3 new functions in seperate the data
        return {
            current: parseCurrentWeather(data),
            daily: parseDailyWeather(data),
            hourly: parseHourlyWeather(data)
        }
    })  
}

function parseCurrentWeather({ current_weather, daily }) {
    const {
         temperature: currentTemp,
         windspeed: windSpeed,
         weathercode: iconCode 
        } = current_weather

    const {
        temperature_2m_max: [maxTemp],
        temperature_2m_min: [minTemp],
        apparent_temperature_max: [maxFeelsLike],
        apparent_temperature_min: [minFeelsLike],
        precipitation_sum: [precip],
    } = daily
    
    return {
        // math.round with round all of the values to the nearest whole number
        currentTemp: Math.round(currentTemp),
        highTemp: Math.round(maxTemp),
        lowTemp: Math.round(minTemp),
        highFeelsLike: Math.round(maxFeelsLike),
        lowFeelsLike: Math.round(minFeelsLike),
        windSpeed: Math.round(windSpeed),
        precip: Math.round(precip * 100) / 100,
        iconCode,
    }
}

function parseDailyWeather({ daily }) {
    return daily.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            iconCode: daily.weathercode[index],
            maxTemp: Math.round(daily.temperature_2m_max[index])
        }
    })
}

function parseHourlyWeather({ hourly, current_weather }) {
    return hourly.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            iconCode: hourly.weathercode[index],
            temp: Math.round(hourly.temperature_2m[index]),
            feelsLike: Math.round(hourly.apparent_temperature[index]),
            windSpeed: Math.round(hourly.windspeed_10m[index]),
            precip: Math.round(hourly.precipitation[index] * 100) / 100,
        }
        // the filterbelow set the time for our hourlt to be at or later in the day than my current time
    }).filter(({ timestamp }) => timestamp >= current_weather.time * 1000)
}



