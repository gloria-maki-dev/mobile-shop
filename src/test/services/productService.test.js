import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';
import { fetchProducts, fetchProductDetail, addToCart } from '../../services/productService';

globalThis.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = value.toString();
  },
  clear() {
    this.store = {};
  },
  removeItem(key) {
    delete this.store[key];
  },
};

vi.mock('axios');

describe('productService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('fetchProducts llama a la API si no hay caché', async () => {
    const mockData = [{ id: 1, brand: 'Samsung' }];
    axios.get.mockResolvedValue({ data: mockData });

    const data = await fetchProducts();

    expect(axios.get).toHaveBeenCalledWith('https://itx-frontend-test.onrender.com/api/product');
    expect(data).toEqual(mockData);
  });

  it('fetchProducts devuelve datos desde caché si es válido', async () => {
    const cached = [{ id: 2, brand: 'Motorola' }];
    localStorage.setItem('products', JSON.stringify({
      data: cached,
      timestamp: Date.now()
    }));

    const data = await fetchProducts();

    expect(axios.get).not.toHaveBeenCalled();
    expect(data).toEqual(cached);
  });

  it('fetchProductDetail llama a la API si no hay caché', async () => {
    const mockData = { id: 1, brand: 'Apple' };
    axios.get.mockResolvedValue({ data: mockData });

    const data = await fetchProductDetail(1);

    expect(axios.get).toHaveBeenCalledWith('https://itx-frontend-test.onrender.com/api/product/1');
    expect(data).toEqual(mockData);
  });

  it('addToCart llama a la API con los parámetros correctos', async () => {
    const mockResponse = { success: true };
    axios.post.mockResolvedValue({ data: mockResponse });

    const result = await addToCart({ id: 1, colorCode: 'red', storageCode: '64gb' });

    expect(axios.post).toHaveBeenCalledWith(
      'https://itx-frontend-test.onrender.com/api/cart',
      { id: 1, colorCode: 'red', storageCode: '64gb' }
    );
    expect(result).toEqual(mockResponse);
  });
});
