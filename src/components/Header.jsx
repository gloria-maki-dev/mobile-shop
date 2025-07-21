import { Link } from "react-router-dom"
import { Smartphone, ShoppingCart, ChevronRight, Home } from "lucide-react"
import "../assets/styles/header.css"

const Header = ({ cartItemCount = 3, breadcrumbs = [{ label: "Inicio", href: "/" }] }) => (
  <header className="header">
    <div className="header-container">
      <div className="header-content">
        <Link to="/" className="logo-link">
          <Smartphone className="logo-icon" />
          <h1 className="logo-title">Mobile Shop Test</h1>
        </Link>
        <nav className="breadcrumbs-desktop">
          {breadcrumbs.map((item, i) => (
            <span key={item.href} className="breadcrumb-item">
              {i === 0 && <Home className="home-icon" />}
              <Link to={item.href} className="breadcrumb-link">
                {item.label}
              </Link>
              {i < breadcrumbs.length - 1 && <ChevronRight className="chevron-icon" />}
            </span>
          ))}
        </nav>
        <button className="cart-button">
          <Link to="/cart" className="cart-link">
            <ShoppingCart className="cart-icon" />
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount > 99 ? "99+" : cartItemCount}</span>
            )}
          </Link>
        </button>
      </div>
      <nav className="breadcrumbs-mobile">
        {breadcrumbs.map((item, i) => (
          <span key={item.href} className="breadcrumbs-mobile-nav">
            {i === 0 && <Home className="home-icon-mobile" />}
            <Link to={item.href} className="breadcrumb-link-mobile">
              {item.label}
            </Link>
            {i < breadcrumbs.length - 1 && <ChevronRight className="chevron-icon-mobile" />}
          </span>
        ))}
      </nav>
    </div>
  </header>
)

export default Header