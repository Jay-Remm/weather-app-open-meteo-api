// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=America%2FNew_York


// export function getWeather(lat, lon, timezone) {
//     params = {
//         latitude: lat,
//         longitude: lon,
//         timezone,
//     }

//     return fetch('https://api.open-meteo.com/v1/forecast?&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime', params)
//     // .then(response => response.json())
    
// }



// function getWeather(lat, lon, timezone) {

//     // I was having a lot of trouble with throwing in the URL, because it would always show the default latitude, longitude, and timezone. so using backtics and template literals i was able to plug in lariables that my function asks to call when run.

//     return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}2&longitude=${lon}&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime&timezone=${timezone}`)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//         return data
//     })

//     var lat;
//     var lon;
//     var timezone;
    
// }

// getWeather(40.1, -74.3, 'America/New_York')
//   .then((data) => {
//     console.log(data)
// })




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
        return data
    })  
}



