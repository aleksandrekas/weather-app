import units from "../assets/icons/Units Icon.svg";
import dropDownIcon from "../assets/icons/Units Dropdown Icon.svg"
import { useState } from "react";

export default function Units(){
    const [open,setOpen] = useState(false)
    const [options,setOptions] = useState({
        temperature:false,
        speed:false,
        precipitation:false
    })

    function toggle(){
        setOpen(!open)
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

            </div>
        </div>
    )
}