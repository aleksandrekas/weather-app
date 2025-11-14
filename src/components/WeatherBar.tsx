import { useEffect, useState } from "react"
import sunny from "../assets/weather/Clear-sunny.png"
import { useSelector } from "react-redux"
import DailyForecastItem from "./DailyForecastItem"
import HourlyWeather from "./HourlyWeather"





export default function WeatherBar(){
    type DailyWeather = {
        time: string[]
        temperature_2m_max: number[]
        temperature_2m_min: number[]
        weather_code: number[]
    }
    type CurrentWeather = {
        feelsLike:number
        precipitation:number
        humidity:number
        temperature: number
        time:string
        windSpeed:number
        formattedTime:string
    }

    type Hourly={
        time:string[]
        temperature: number[]
        weather_code:number[]
    }

    type WeatherState = {
        daily: DailyWeather | null
        current :CurrentWeather
        hourlyWeather:Hourly 
    }

    const [weather,setWeather] = useState<WeatherState>({
        daily:null,
        current:{
            feelsLike: 0,
            precipitation: 0,
            humidity : 0,
            temperature:0,
            windSpeed: 0,
            time:"",
            formattedTime:""
        },
        hourlyWeather:{
            time:[],
            temperature:[],
            weather_code:[]
        }
    })

    const [loading,setLoading] = useState(true)



    const location = useSelector((state:any) => state.location)
    


    function formatTime(time:string):string{
        return new Date(time).toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric",year:"numeric"})
    }


    async function fetchWeather(lat: number, lon: number) {
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weather_code&current=temperature_2m,precipitation,wind_speed_10m,relative_humidity_2m,apparent_temperature&timezone=auto`;

            setLoading(true)

            const response = await fetch(url);
           
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            console.log(data.current)

            setWeather((prev)=>({
                ...prev,
                daily:data.daily,
                current:{
                    feelsLike:data.current.apparent_temperature,
                    precipitation:data.current.precipitation,
                    humidity:data.current.relative_humidity_2m,
                    temperature:data.current.temperature_2m,
                    windSpeed:data.current.wind_speed_10m,
                    time:data.current.time,
                    formattedTime:formatTime(data.current.time)
                }
            }))
            return data;
        } catch (err) { 
            console.error("Failed to fetch weather data:", err);
        }finally{
            setLoading(false)
        }
    }
    
    async function fetchHourlyData(lat: number, lon: number){
        if(weather.current?.time != '' && weather.current?.time != null){
            try{
                const time =weather.current.time.split("T")[0] 
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code&start_date=${time}&end_date=${time}`;
                const res = await fetch(url)
                const data = await res.json()
                setWeather((prev)=>({
                    ...prev,
                    hourlyWeather:{
                        time:data.hourly.time,
                        temperature:data.hourly.temperature_2m,
                        weather_code:data.hourly.weather_code
                    }
                }))

            }catch(err){
                console.log(err)
            }
        }
    }


    useEffect(()=>{
        fetchWeather(location.lat,location.lon)
    },[location])
    useEffect(()=>{
        fetchHourlyData(location.lat,location.lon)
    },[weather.current?.time])
    
    console.log(loading)


    return(
        <div className="holder">
            <div className="leftSideInfo">
                <div className="forecast" >
                    {loading === true ?
                        <div className="loading"></div>
                        :
                        <>
                            <div className="cit_date">
                                <h2>{location.name}</h2>
                                <p>{weather.current.formattedTime}</p>
                            </div>
                            <div className="sun_temp">
                                <img src={sunny} alt="sunny_weather"/>
                                <p><i>{weather.current!.temperature}</i><sup>o</sup></p>
                            </div>
                            <img src="src\assets\background\Desktop - Hero bg.svg" alt="" />
                        </>
                    }              
                </div>
                {loading === true ? 
                    <div className="detailedForecastLoading"></div>
                    :
                    <div className="detailedForecast">
                        <DetailedForecastItem section="Feels Like" data={`${weather.current?.feelsLike}`} />
                        <DetailedForecastItem section="Humidity" data={`${weather.current?.humidity}%`} />
                        <DetailedForecastItem section="Wind" data={`${weather.current?.windSpeed} Km/h`} />
                        <DetailedForecastItem section="Precipitation" data={`${weather.current?.precipitation} mm`} />
                    </div>

                }
                <div className="dailyForecastWrapper">
                    <h1 className="dailyForecastTitle">Daily Forecast</h1>
                    {loading === true? 
                        <div className="dailyForecastLoading"></div>
                        :
                        <div className="dailyForecast">
                            {weather.daily !== null ? 
                            weather.daily.time.map((item,index)=>(
                                <DailyForecastItem key={index} day={item} max={weather.daily!.temperature_2m_max[index]}
                                min={weather.daily!.temperature_2m_min[index]} code={weather.daily!.weather_code[index]} />
                            )) 
                            : 
                            <div>no info</div>}
                        </div>
                    }
                </div>
            </div>
            <div className="hourlyForecast">
                    <p>Hourly forecast</p>
                    {loading === true ? 
                        <div className="hourlyForecastLoading"></div>
                        :
                        <div className="hourlyData">
                            {weather.hourlyWeather.time.map((item,index)=>(
                                <HourlyWeather key={index} time={item} temp={weather.hourlyWeather.temperature[index]} weather={weather.hourlyWeather.weather_code[index]} />
                            ))}
                        </div>
                    }
            </div>
        </div>
    )
}









function DetailedForecastItem({section,data}:{section:string,data:string}){
    return (
        <div className="forecastItem">
            <h5>{section}</h5>
            <p>{data}</p>
        </div>
    )
}



