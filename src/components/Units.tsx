import units from "../assets/icons/Units Icon.svg";
import dropDownIcon from "../assets/icons/Units Dropdown Icon.svg"
import selected from "../assets/icons/done.svg";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Units(){
    const [open,setOpen] = useState(false)
    const [options,setOptions] = useState({
        temperature:"celcius",
        speed:"kmh",
        precipitation:"millimeters"
    })
    const unitState = useSelector((state:any) => state.unit)

    function toggle(){
        setOpen(!open)
    }

    function handleSelect(e: React.MouseEvent<HTMLButtonElement>){
        const {value,name} = e.currentTarget;

        setOptions((prev)=>({
            ...prev,
            [name]:value
        }))
    }




    return (
        <div className="dropDownContainer">
            <button onClick={toggle} className="dropDownbtn units">
                <img src={units} alt="Unit-icon" />
                <p>Units</p>
                <img src={dropDownIcon} alt="dropDown-icon" />
            </button>
            <div className="options" style={{display: open? "block" : "none"}} >
                <h4>Switch to imperial</h4>
                <div className="option_sections">
                    {/* temperature */}
                    <div className="section_container">
                        <h6>Temperature</h6>
                        <button onClick={handleSelect} name="temperature" style={{backgroundColor : options.temperature === "celcius"? "#3C3B5E": "#262540"}} className="sections_button" value="celcius">
                            <p>Celcius(<sup>o</sup>C)</p>
                            <img style={{visibility: options.temperature === "celcius"? "visible":"hidden"}} src={selected} alt="selected" />
                        </button>
                        <button onClick={handleSelect} name="temperature" style={{backgroundColor : options.temperature === "fahrenheit"? "#3C3B5E": "#262540"}} className="sections_button" value="fahrenheit">
                            <p>Fahrenheit(<sup>o</sup>F)</p>
                            <img style={{visibility: options.temperature === "fahrenheit"? "visible":"hidden"}} src={selected} alt="selected" />
                        </button>
                    </div>
                    {/* wind speed */}
                    <div className="section_container">
                        <h6>Wind Speed</h6>
                        <button onClick={handleSelect} name="speed" style={{backgroundColor : options.speed === "kmh"? "#3C3B5E": "#262540"}} className="sections_button" value="kmh">
                            <p>km/h</p>
                            <img style={{visibility: options.speed === "kmh"? "visible":"hidden"}} src={selected} alt="selected" />
                        </button>
                        <button onClick={handleSelect} name="speed" style={{backgroundColor : options.speed === "mph"? "#3C3B5E": "#262540"}} className="sections_button" value="mph">
                            <p>mph</p>
                            <img style={{visibility: options.speed === "mph"? "visible":"hidden"}} src={selected} alt="selected" />
                        </button>
                    </div>
                    {/* precipitation */}
                    <div  style={{border:"none"}} className="section_container">
                        <h6>Precopitation</h6>
                        <button onClick={handleSelect} name="precipitation" style={{backgroundColor : options.precipitation === "millimeters"? "#3C3B5E": "#262540"}} className="sections_button" value="millimeters">
                            <p>Millimeters(mm)</p>
                            <img style={{visibility: options.precipitation === "millimeters"? "visible":"hidden"}} src={selected} alt="selected" />
                        </button>
                        <button onClick={handleSelect} name="precipitation" style={{backgroundColor : options.precipitation === "inches"? "#3C3B5E": "#262540"}} className="sections_button" value="inches">
                            <p>Inches(in)</p>
                            <img style={{visibility: options.precipitation === "inches"? "visible":"hidden"}} src={selected} alt="selected" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}