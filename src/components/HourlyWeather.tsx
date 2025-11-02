import { getWeatherIcon } from "./DailyForecastItem";



export default function HourlyWeather({time,temp,weather}:{time:string,temp:number,weather:number}){
    const formattedTime = new Date(time).toLocaleTimeString("en-US",{hour:"numeric",minute:undefined,hour12:true})
    return (
        <div className="hourlyWeatherItem">
            <div>
                <img src={`src/assets/weather/${getWeatherIcon(weather)}.png`} alt="" />
                <p>{formattedTime}</p>
            </div>
            <p>{Math.round(temp)}<sup>o</sup></p>
        </div>
    )
}