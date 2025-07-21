import axios from 'axios';

const API_URL = 'https://itx-frontend-test.onrender.com/api/product';
const EXPIRATION_TIME = 60 * 60 * 1000;
const getFromCache = (key) => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp < EXPIRATION_TIME) return data;

  localStorage.removeItem(key);
  return null;
};

const saveToCache = (key, data) => {
  localStorage.setItem(
    key,
    JSON.stringify({ data, timestamp: Date.now() })
  );
};

export const fetchProducts = async () => {
  const cached = getFromCache('products');
  if (cached) return cached;

  const response = await axios.get(API_URL);
  saveToCache('products', response.data);
  return response.data;
};

export const fetchProductDetail = async (id) => {
  const cacheKey = `product-${id}`;
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  const response = await axios.get(`${API_URL}/${id}`);
  saveToCache(cacheKey, response.data);
  return response.data;
};

export const addToCart = async ({ id, colorCode, storageCode }) => {
  const response = await axios.post(
    'https://itx-frontend-test.onrender.com/api/cart',
    { id, colorCode, storageCode }
  );
  return response.data;
};
