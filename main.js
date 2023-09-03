// import "./style.css"

// I had to comment out the css import because it was causing a console error and I could not see my object populating in the console until the error was taken care of

// import needs the js signifier, even though vscode wants to drop it
import { getWeather } from "./weather.js"

getWeather(10.1, 10.1, Intl.DateTimeFormat().resolvedOptions().timeZone)
    .then((data) => {
        console.log(data);
    }
)