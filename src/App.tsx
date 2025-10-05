import Units from "./components/Units"
import Logo from "./assets/icons/Logo.svg"
import SearchBar from "./components/SearchBar"
import WeatherBar from "./components/WeatherBar"



function App() {
   return (
    <div className="appContainer">
      <header className="header">
        <img src={Logo} alt="logo" />
        <Units/>
      </header>
      <SearchBar />
      <WeatherBar />
    </div>
  )
}

export default App
