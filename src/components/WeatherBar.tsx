import dropDownIcon from "../assets/icons/Units Dropdown Icon.svg"
import { useEffect, useState } from "react"
import sunny from "../assets/weather/Clear-sunny.png"
import { useSelector } from "react-redux"
import DailyForecastItem from "./DailyForecastItem"






export default function WeatherBar(){
    type DailyWeather = {
        time: string[]
        temperature_2m_max: number[]
        temperature_2m_min: number[]
        weather_code: number[]
    }
    type CurrentWeather = {
        apparent_temperature:number
        interval:number
        precipitation:number
        relative_humidity_2m:number
        temperature_2m: number
        time:string
        wind_speed_10m:number
    }

    type WeatherState = {
        daily: DailyWeather | null
        current :CurrentWeather | null
    }
    const [toggleSelector,SetSelector] = useState(false)
    const [selectedDay,setDay] = useState('Monday')
    const [weather,setWeather] = useState<WeatherState>({
        daily:null,
        current:null
    })



    const location = useSelector((state:any) => state.location)
    
    function selectDay(e:React.MouseEvent<HTMLButtonElement>){
        setDay(e.currentTarget.value)
        SetSelector(false)
    }

    async function fetchWeather(lat: number, lon: number) {
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m&current=temperature_2m,precipitation,wind_speed_10m,relative_humidity_2m,apparent_temperature&timezone=auto`;

            const response = await fetch(url.replace(/\s+/g, ""));
           
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            // console.log(data)
            setWeather({
                daily:data.daily,
                current:data.current
            })
            return data;
        } catch (err) { 
            console.error("Failed to fetch weather data:", err);
        }
    }



    useEffect(()=>{
        fetchWeather(location.lat,location.lon)
    },[location])
    useEffect(()=>{
        console.log(weather.current)
    },[weather])



    return(
        <div className="holder">
            <div className="leftSideInfo">
                <div className="forecast" >              
                    <div className="cit_date">
                        <h2>{location.name}</h2>
                        <p>Tuesday,Aug 5,2025</p>
                    </div>
                    <div className="sun_temp">
                        <img src={sunny} alt="sunny_weather"/>
                        <p><i>{weather.current!.temperature_2m}</i><sup>o</sup></p>
                    </div>
                </div>
                <div className="detailedForecast">
                    <DetailedForecastItem section="Feels Like" data={`${weather.current?.apparent_temperature}`} />
                    <DetailedForecastItem section="Humidity" data={`${weather.current?.relative_humidity_2m}%`} />
                    <DetailedForecastItem section="Wind" data={`${weather.current?.wind_speed_10m} Km/h`} />
                    <DetailedForecastItem section="Precipitation" data={`${weather.current?.precipitation} mm`} />
                </div>
                <div className="dailyForecastWrapper">
                    <h1 className="dailyForecastTitle">Daily Forecast</h1>
                    <div className="dailyForecast">
                        {weather.daily !== null ? 
                        weather.daily.time.map((item,index)=>(
                            <DailyForecastItem key={index} day={item} max={weather.daily!.temperature_2m_max[index]}
                            min={weather.daily!.temperature_2m_min[index]} code={weather.daily!.weather_code[index]} />
                        )) 
                        : 
                        <div>no info</div>}
                    </div>
                </div>
            </div>
            <div className="hourlyForecast">
                <div className="daySelector">
                    <p>Hourly forecast</p>
                    <button onClick={()=>{SetSelector(!toggleSelector)}} className="dropDownbtn days">
                        <p>{selectedDay}</p>
                        <img src={dropDownIcon} alt="dropDown-icon" />
                    </button>
                    <div className="days_options" style={{display:toggleSelector? 'flex':'none'}}>
                        <DayButton day={"Monday"} state={selectedDay} callback={selectDay} />
                        <DayButton day={"Tuesday"} state={selectedDay} callback={selectDay} />
                        <DayButton day={"Wednesday"} state={selectedDay} callback={selectDay} />
                        <DayButton day={"Thursday"} state={selectedDay} callback={selectDay} />
                        <DayButton day={"Friday"} state={selectedDay} callback={selectDay} />
                        <DayButton day={"Saturday"} state={selectedDay} callback={selectDay} />
                        <DayButton day={"Sunday"} state={selectedDay} callback={selectDay} />
                    </div>
                </div>
            </div>
        </div>
    )
}





function DayButton({day,callback,state}:{day:string,callback:any,state:string}){
    return(
        <button  className={`weekDay ${state === day? "selected":""}`} onClick={callback} value={day}>{day}</button>
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



