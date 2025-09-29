import searchIcon from "../assets/icons/Search Icon.svg"




export default function SearchBar(){
    return(
        <div className="searchBar">
            <h1>How's the sky looking today?</h1>
            <form className="searchForm">
                <input type="text" placeholder="Search for a place..." />
                <input type="submit" value="Search" />
                <img src={searchIcon} alt="" />
            </form>
        </div>
    )
}