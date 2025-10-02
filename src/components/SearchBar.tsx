import searchIcon from "../assets/icons/Search Icon.svg"
import { useEffect, useState } from "react"
import loading from "../assets/icons/loading.svg"
import CityBar from "./CityBar"
type CityType = {
    name : string;
    lat: number;
    long:number
}



export default function SearchBar(){
    const [city,setCity] = useState({
        cityname:'',
        searchName:''
    })
    const [cityNames,setCityNames] = useState<CityType[]>([])
    

    function handleInputChange(e:React.ChangeEvent<HTMLInputElement>){
        setCity((prev)=>({
            ...prev,
            cityname:e.target.value
        }))
    }


    useEffect(()=>{
        const searchNameHandler = setTimeout(()=>{
            // setting 1 sec delay for seachName,purpose:
            // npminatim api allows only 1 request per second for city names 
            setCity((prev)=>({
                ...prev,
                searchName:city.cityname
            }))
        },1000)

        return ()=>{
            clearTimeout(searchNameHandler)
        }
    },[city.cityname])

    useEffect(()=>{
        (async()=>{
            if(city.searchName != ""){
                try{
                    const cities = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(city.searchName)}&limit=5&apiKey=2e95952892144e7397ac3df304bce5a2`,{
                        headers:{
                            "Content-Type":"application/json"
                        }
                    })
    
                    const data = await cities.json()
    
                    data.features.map((item)=>{
                        setCityNames((prev)=>[
                            {name:item.properties.formatted,lat:item.properties.lat,long:item.properties.lon},
                            ...prev
                        ])
                    })
    
                }catch(err){
                    console.error(err)
                }
            }
        })()
    },[city.searchName])


    console.log(cityNames)


    return(
        <div className="searchBar">
            <h1>How's the sky looking today?</h1>
            <form className="searchForm">
                <input onChange={handleInputChange} type="text" placeholder="Search for a place..." />
                <input type="submit" value="Search" />
                <img src={searchIcon} alt="" />
                <div className="searchResultContainer" style={{display: city.cityname === ''? 'none' : 'block'}}>
                    {
                        cityNames.length === 0 ?
                        <div className="progress">
                        </div> :
                        
                    }
                </div>
            </form>
        </div>
    )
}

