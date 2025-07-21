"use client"

import { useEffect, useState } from "react"
import { fetchProducts } from "../services/productService"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import "../assets/styles/home-page.css"

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchProducts().then(setProducts)
  }, [])
  const normalized = search.trim().toLowerCase()
  const filtered = products.filter(
    (p) => p.brand.toLowerCase().includes(normalized) || p.model.toLowerCase().includes(normalized),
  )
  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= Math.floor(rating) ? "star filled" : "star"}>★</span>
      )
    }
    return stars
  }
  return (
    <div className="container">
      <Header />
      <div className="home-container">
        <main className="main-content">
          <div className="content-header">
            <h2 className="list-title">PRODUCTOS</h2>
            <SearchBar search={search} setSearch={setSearch} />
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
                    <div className="rating-stars">
                      {renderStars(p.rating)}
                      <span className="rating-value">{p.rating}</span>
                    </div>
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
  );
}

export default HomePage
