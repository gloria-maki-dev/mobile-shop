import { Search, Filter } from "lucide-react"
import "../assets/styles/search-page.css"
const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="search-bar-modern">
      <Search className="search-icon" size={20} color="#4ef0ca" />
      <input
        type="text"
        placeholder="Buscar productos, marcas, modelos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input-modern"
      />
    </div>
  )
}

export default SearchBar
