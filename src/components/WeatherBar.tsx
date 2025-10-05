





export default function WeatherBar(){
    return(
        <div className="holder">
            <div className="leftSideInfo">
                <div className="forecast" >

                </div>
                <div className="detailedForecast"></div>
                <div className="dailyForecast"></div>
            </div>
            <div className="hourlyForecast"></div>
        </div>
    )
}