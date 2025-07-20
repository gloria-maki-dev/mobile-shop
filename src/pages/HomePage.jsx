"use client"

import { useEffect, useState } from "react"
import { fetchProducts } from "../services/productService"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import "../assets/styles/HomePage.css"

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchProducts().then(setProducts)
  }, [])

  const filtered = products.filter(
    (p) => p.brand.toLowerCase().includes(search.toLowerCase()) || p.model.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="container">
    <Header />
    <div className="home-container">
     

      <main className="main-content">
        <div className="content-header">
          <h2 className="list-title">LIST VIEW</h2>
          <div className="search-section">
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <button className="search-button">SEARCH</button>
          </div>
        </div>

        <div className="products-grid">
          {filtered.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} className="product-link">
              <div className="product-item">
                <div className="product-image">
                  <img src={p.imgUrl || "/placeholder.svg"} alt={p.model} />
                </div>
                <div className="product-info">
                  <h3 className="product-title">
                    {p.brand} - {p.model}
                  </h3>
                  <p className="product-price">{p.price} €</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="no-results">
            <p>No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </main>
    </div>
    </div>
  )
}

export default HomePage
