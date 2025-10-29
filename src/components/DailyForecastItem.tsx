
export default function DailyForecastItem({day,max,min,code}:{day:string,max:number ,min:number ,code:number}){
    const dayName = new Date(day).toLocaleDateString("en-US", { weekday: "short" })

    function getWeatherIcon(code:number) {
        if ([0, 1].includes(code)) return "Clear-sunny";
        if ([2].includes(code)) return "Partly Cloudy";
        if ([3].includes(code)) return "Overcast";
        if ([45, 48].includes(code)) return "Fog";
        if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
        if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Rain";
        if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snow";
        if ([95, 96, 99].includes(code)) return "Thunderstorms";
        return "unknown";
    }


    return(
        <div className="dailyForecastItem">
            <h1>{dayName}</h1>
            <img src={`src/assets/weather/${getWeatherIcon(code)}.png`} alt="" />
            <div className="temp">
                <p>{Math.round(min)}<sup>o</sup></p>
                <p>{Math.round(max)}<sup>o</sup></p>
            </div>
        </div>
    )
}