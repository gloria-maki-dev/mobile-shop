const SearchBar = ({ search, setSearch }) => {
    return (
      <div className="search-section">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>
    )
  }
  
  export default SearchBar
  