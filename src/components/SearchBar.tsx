import searchIcon from "../assets/icons/Search Icon.svg"
import loading from "../assets/icons/loading.svg"
import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { setLocation } from "../store/locationSlice"


import CityBar from "./CityBar"
type CityType = {
    name : string;
    lat: number;
    long:number
}


export default function SearchBar(){
    const [city,setCity] = useState('')
    const [cityNames,setCityNames] = useState<CityType[]>([])
    const [focus,setFocus] = useState<Boolean>(false)
    const dispatch = useDispatch()
    const cityState = useSelector((state:any) => state.location)

    function handleInputChange(e:React.ChangeEvent<HTMLInputElement>){
        setCity(e.target.value)
        setFocus(true)
    }


    function focusChange(){
        setCity('')
        setFocus(false)
    }

    useEffect(()=>{ 
        navigator.geolocation.getCurrentPosition(async(position)=>{
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            const citydata = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=2e95952892144e7397ac3df304bce5a2`)
            const cityName = await  citydata.json()

            dispatch(setLocation({
                lat:latitude,
                lon:longitude,
                name:`${cityName.features[0].properties.city},${cityName.features[0].properties.country}`

            }))
        })
        console.log("initial city added")

    },[])



    useEffect(()=>{
        (async()=>{
            if(city != ""){
                try{
                    const cities = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(city)}&limit=5&apiKey=2e95952892144e7397ac3df304bce5a2`,{
                        headers:{
                            "Content-Type":"application/json"
                        }
                    })
    
                    const data = await cities.json()
                    setCityNames(
                        data.features.map((item: any) => ({
                        name: `${item.properties.city},${item.properties.country}`,
                        lat: item.properties.lat,
                        long: item.properties.lon,
                        }))
                    );
                    
    
                }catch(err){
                    console.error(err)
                }
            }else{
                    setCityNames([])
                    setFocus(false)
            }
        })()
    },[city])




    return(
        <div className="searchBar">
            <h1>How's the sky looking today?</h1>
            <form className="searchForm">
                <input name="cityInput" className="searchFormInput" onChange={handleInputChange} type="text" placeholder="Search for a place..." value={city}/>
                <input  className="submitBtn" type="submit" value="Search" />
                <img className="searchIcon" src={searchIcon} alt="" />
                <div className="searchResultContainer" style={{display: !focus ? 'none' : 'flex'}}>
                    {cityNames.length === 0 ?
                        <div className="searching">
                            <img src={loading} alt="loading" />
                            <h4>Searching</h4>
                        </div>
                    :
                        cityNames.map((item,index)=>(
                            <CityBar key={index} name={item.name} lat={item.lat} lon={item.long} method = {focusChange} />
                        ))}
                </div>
            </form>
        </div>
    )
}

