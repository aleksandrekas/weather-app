

type cord = {
    lat : number,
    lon: number
}



export default function CityBar({name,lat,lon}:{name:string,lat:number,lon:number}){
    const coordinates : cord = {
        lat:lat,
        lon:lon
    }   


    return (
        <div className="city">
            <h2>{name}</h2>
        </div>
    )
}