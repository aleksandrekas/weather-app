import dropDownIcon from "../assets/icons/Units Dropdown Icon.svg"
import background from "../assets/background/Desktop - Hero bg.svg"
import { useState } from "react"
import sunny from "../assets/weather/Clear-sunny.png"



export default function WeatherBar(){
    const [toggleSelector,SetSelector] = useState(false)
    const [selectedDay,setDay] = useState('Monday')


    function selectDay(e:React.MouseEvent<HTMLButtonElement>){
        setDay(e.currentTarget.value)
        SetSelector(false)
    }




    return(
        <div className="holder">
            <div className="leftSideInfo">
                <div className="forecast" >              
                    <div className="cit_date">
                        <h2>Berlin,Germany</h2>
                        <p>Tuesday,Aug 5,2025</p>
                    </div>
                    <div className="sun_temp">
                        <img src={sunny} alt="sunny_weather"/>
                        <p><i>20</i><sup>o</sup></p>
                    </div>
                </div>
                <div className="detailedForecast">
                    <div className="feelsLike">

                    </div>

                </div>
                <div className="dailyForecast"></div>
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



function DetailedForecastItem(){
    return (
        <div className="forecastItem">
            <h5></h5>
            <p></p>
        </div>
    )
}