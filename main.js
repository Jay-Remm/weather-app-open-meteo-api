// import needs the js signifier, even though vscode wants to drop it
import { getWeather } from "./weather.js"

getWeather(10.1, 10.1, Intl.DateTimeFormat().resolvedOptions().timeZone)
    .then((data) => {
        console.log(data);
    }
)