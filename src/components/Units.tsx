import unitIcon from "../assets/Units Icon.png"
import dropDownIcon from "../assets/Units Dropdown Icon.png"


export default function Units(){
    return (
        <div>
            <button className="dropDownbtn units">
                <img src={unitIcon} alt="Unit-icon" />
                <p>Units</p>
                <img src={dropDownIcon} alt="dropDown-icon" />
            </button>
            <div className="options">
                
            </div>
        </div>
    )
}