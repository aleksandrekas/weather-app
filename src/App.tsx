import Units from "./components/Units"
import Logo from "./assets/icons/Logo.svg"
import SearchBar from "./components/SearchBar"

function App() {
   return (
    <div className="appContainer">
      <header className="header">
        <img src={Logo} alt="logo" />
        <Units/>
      </header>
      <SearchBar />
    </div>
  )
}

export default App
