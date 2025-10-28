import { useDispatch } from "react-redux"
import { setLocation } from "../store/locationSlice"

export default function CityBar({ name, lat, lon,method }: { name: string; lat: number; lon: number;method:any }) {
  const dispatch = useDispatch()

  function changeLocation() {
    console.log("Clicked city:", name, lat, lon)
    dispatch(setLocation({ lat, lon, name }))
    method()
  }

  return (
    <div onClick={changeLocation} className="city">
      <h2>{name}</h2>
    </div>
  )
}