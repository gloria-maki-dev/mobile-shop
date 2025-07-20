import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductDetail, addToCart } from '../services/productService';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProductDetail(id).then(setProduct);
  }, [id]);

  const handleAddToCart = async () => {
    if (!selectedColor || !selectedStorage) {
      setMessage('Selecciona color y almacenamiento');
      return;
    }
    const result = await addToCart({
      id: product.id,
      colorCode: selectedColor,
      storageCode: selectedStorage
    });
    setMessage(`Producto añadido. Total en carrito: ${result.count}`);
  };

  if (!product) return <p>Cargando...</p>;

  return (
    <div>
      <h2>{product.brand} - {product.model}</h2>
      <img src={product.imgUrl} alt={product.model} width="200" />
      <p>Precio: {product.price} €</p>
      <div>
        <label>Color: </label>
        <select onChange={(e) => setSelectedColor(e.target.value)}>
          <option value="">Selecciona</option>
          {product.options.colors.map((c) => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Almacenamiento: </label>
        <select onChange={(e) => setSelectedStorage(e.target.value)}>
          <option value="">Selecciona</option>
          {product.options.storages.map((s) => (
            <option key={s.code} value={s.code}>{s.name}</option>
          ))}
        </select>
      </div>
      <button onClick={handleAddToCart}>Agregar al carrito</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProductDetailPage;
