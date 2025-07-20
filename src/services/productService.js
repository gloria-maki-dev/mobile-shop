import axios from 'axios';

const API_URL = 'https://itx-frontend-test.onrender.com/api/product';

export const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchProductDetail = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const addToCart = async ({ id, colorCode, storageCode }) => {
  const response = await axios.post('https://itx-frontend-test.onrender.com/api/cart', {
    id,
    colorCode,
    storageCode
  });
  return response.data;
};
