import searchIcon from "../assets/icons/Search Icon.svg"
import { useEffect, useState } from "react"


export default function SearchBar(){
    const [city,setCity] = useState({
        cityname:'',
        searchName:''
    })
    const [cityNames,setCityNames] = useState([])
    

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
            try{
                const cities = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=10&city=${encodeURIComponent(city.searchName)}&extratags=1&namedetails=1`,{
                    headers:{
                        "Accept":"application/json"
                    }
                })

                const data = await cities.json()
                console.log(data) 


            }catch(err){
                console.error(err)
            }
        })()
    },[city.searchName])



    return(
        <div className="searchBar">
            <h1>How's the sky looking today?</h1>
            <form className="searchForm">
                <input onChange={handleInputChange} type="text" placeholder="Search for a place..." />
                <input type="submit" value="Search" />
                <img src={searchIcon} alt="" />
            </form>
        </div>
    )
}