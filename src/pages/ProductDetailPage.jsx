import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductDetail, addToCart } from '../services/productService';
import Header from '../components/Header';
import { useCart } from '../context/CartContext'; // 👈 importa el contexto
import '../assets/styles/product-detail.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [message, setMessage] = useState('');

  const { updateCount, count } = useCart();

  useEffect(() => {
    fetchProductDetail(id).then((data) => {
      setProduct(data);
      if (data.options.colors.length === 1) {
        setSelectedColor(data.options.colors[0].code);
      }
      if (data.options.storages.length === 1) {
        setSelectedStorage(data.options.storages[0].code);
      }
    });
  }, [id]);

  const handleAddToCart = async () => {
    console.log('test');
    if (!selectedColor || !selectedStorage) {
      setMessage('Selecciona color y almacenamiento');
      return;
    }
    await addToCart({
      id: product.id,
      colorCode: selectedColor,
      storageCode: selectedStorage,
    });
    updateCount(count + 1);
    setMessage(`Producto añadido. Total en carrito: ${count + 1}`);
  };

  if (!product) return <p>Cargando...</p>;

  return (
    <>
      <Header
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          {
            label: `${product.brand} ${product.model}`,
            href: `/product/${product.id}`,
          },
        ]}
      />

      <div className="product-detail-container">
        <div className="product-image-column">
          <img
            src={product.imgUrl}
            alt={product.model}
            className="product-detail-image"
          />
        </div>

        <div className="product-info-column">
          <h2>
            {product.brand} - {product.model}
          </h2>

          <ul className="product-description">
            <li>Precio: {product.price} €</li>
            <li>CPU: {product.cpu}</li>
            <li>RAM: {product.ram}</li>
            <li>Sistema Operativo: {product.os}</li>
            <li>Resolución: {product.displayResolution}</li>
            <li>Batería: {product.battery}</li>
            <li>
              Cámaras: {product.primaryCamera} / {product.secondaryCamera}
            </li>
            <li>Dimensiones: {product.dimentions}</li>
            <li>Peso: {product.weight}</li>
          </ul>

          <div className="product-actions">
            <label>Color:</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="">Selecciona</option>
              {product.options.colors.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>

            <label>Almacenamiento:</label>
            <select
              value={selectedStorage}
              onChange={(e) => setSelectedStorage(e.target.value)}
            >
              <option value="">Selecciona</option>
              {product.options.storages.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>

            <button onClick={handleAddToCart}>Añadir al carrito</button>

            {message && <p className="cart-message">{message}</p>}
          </div>

          <Link to="/" className="back-link">
            ← Volver a productos
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
