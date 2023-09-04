// import needs the js signifier, even though vscode wants to drop it
import { getWeather } from "./weather.js"
import { ICON_MAP } from "./iconmap.js"

navigator.geolocation.getCurrentPosition(positionSuccess, positionError)

// making two functions to cather coords, a success and a failure

function positionSuccess({ coords }) {
    getWeather(
        coords.latitude, 
        coords.longitude, 
        Intl.DateTimeFormat().resolvedOptions().timeZone
    )
    .then(renderWeather)
    .catch(e => {
        console.error(e)
        alert("Error getting weather.")
    })
}

function positionError() {
    alert('There was an error getting your location. Please allow us to use your location and refresh the page.')
}

// we are going to take our getWeather function and call it and return our data with another function called renderWeather. We are also adding a catch for errors

function renderWeather({ current, daily, hourly }) {
    renderCurrentWeather(current)
    renderDailyWeather(daily)
    renderHourlyWeather(hourly)
    document.body.classList.remove('blurred')
}

// this is a helper function for the renderCurrentWeather function below to make our document.querySelector process faster and with less code
function setValue(selector, value, { parent = document } = {}) {
    parent.querySelector(`[data-${selector}]`).textContent = value
}

function getIconClass(iconCode) {
    // removes the default icon class i set for the icon
    currentIcon.classList.remove('fa-sun', 'fa-cloud', 'fa-cloud-rain')
    currentIcon.classList.add(`fa-${ICON_MAP.get(iconCode)}`)
    // the iconCode should be mapped to the class names for the different icons
}

// using the data attribude in the html we are passing in our js api data into that element
const currentIcon = document.querySelector('[data-current-icon]')
function renderCurrentWeather(current) {
    // i was working the function a lot with the .classList modifier on the currentIcon, and it was leaving an undefined class in my html when inspected. as soon as i removed the classList and added literally anything else (like screen, or as it sits now: class) it worked and added the function above worked to pull the iconCodeinto the html. BUT i cannot have nothing there for it will break the weather data all together and tell me i couldnt get the weather.
    currentIcon.class = getIconClass(current.iconCode)
    setValue('current-temp', current.currentTemp)
    setValue('current-high', current.highTemp)
    setValue('current-low', current.lowTemp)
    setValue('current-feels-high', current.highFeelsLike)
    setValue('current-feels-low', current.lowFeelsLike)
    setValue('current-wind', current.windSpeed)
    setValue('current-precip', current.precip)
}

// moving to the daily weather rendering

// function getDayIcon(iconCode) {
//     // removes the default icon class i set for the icon
//     dailyIcon.classList.remove('fa-sun', 'fa-cloud', 'fa-cloud-rain')
//     dailyIcon.classList.add(`fa-${ICON_MAP.get(iconCode)}`)
//     // the iconCode should be mapped to the class names for the different icons
// }

const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday: "long" })
const dailySelection = document.querySelector('[data-day-section]')
const dayCardTemplate = document.getElementById('day-card-template')

function renderDailyWeather(daily) {
    dailySelection.innerHTML = ''
    // this is how we are cloning our template
    daily.forEach(day => {
        const element = dayCardTemplate.content.cloneNode(true)
        // we are goting to use let instead of const to assign dailyIcon as a variable that i can all inside of my nested function below, but still pointing to the element.
        let dailyIcon = element.querySelectorAll('[data-icon]')
        setValue('temp', day.maxTemp, { parent: element })
        setValue("date", DAY_FORMATTER.format(day.timestamp), { parent: element })

        // my nested function below works alot like the getIconClass function above, but because im getting a node list for my elements of day card templates from this parent function, I am asking that forEach of the [data-icon] instances, I change the icon by (arrow-function) tapping into the class list
        function getDayIcon(iconCode) {
            // removes the default icon class you set for the icon
            dailyIcon.forEach(icon => icon.classList.remove('fa-sun', 'fa-cloud', 'fa-cloud-rain'))
            // adds in my new icon class using the ICON_MAP
            dailyIcon.forEach(icon => icon.classList.add(`fa-${ICON_MAP.get(iconCode)}`))
        }
        
        dailyIcon = Array.from(dailyIcon)
        // above this converts the nodeList i get from the element const to an array for my getDayIcon to parse for the [data-icon]s and change them. below i call the neasted function and apply it to the day card.
        getDayIcon(day.iconCode)
            
        dailySelection.append(element)
    })
}

const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, { hour: "numeric" })
const hourlySelection = document.querySelector('[data-hour-section]')
const hourRowTemplate = document.getElementById('hour-row-template')

function renderHourlyWeather(hourly) {
    hourlySelection.innerHTML = ''
    // this is how we are cloning our template
    hourly.forEach(hour => {
        const element = hourRowTemplate.content.cloneNode(true)
        // making hourlyIcon a variable so i can call it in my nested fuction below
        let hourlyIcon = element.querySelectorAll('[data-icon]')
        setValue('temp', hour.temp, { parent: element })
        setValue('feels-temp', hour.feelsLike, { parent: element })
        setValue('wind', hour.windSpeed, { parent: element })
        setValue('precip', hour.precip, { parent: element })
        setValue('day', DAY_FORMATTER.format(hour.timestamp), { parent: element })
        setValue("time", HOUR_FORMATTER.format(hour.timestamp), { parent: element })

         // Notes on the nested function are the same as the getDayIcon function above
         function getHourIcon(iconCode) {
            // removes the default icon class you set for the icon
            hourlyIcon.forEach(icon => icon.classList.remove('fa-sun', 'fa-cloud', 'fa-cloud-rain'))
            // adds in my new icon class using the ICON_MAP
            hourlyIcon.forEach(icon => icon.classList.add(`fa-${ICON_MAP.get(iconCode)}`))
        }
        
        hourlyIcon = Array.from(hourlyIcon)
        getHourIcon(hour.iconCode)

        hourlySelection.append(element)
    })
}