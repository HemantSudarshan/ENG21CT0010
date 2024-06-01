import React, { useState } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import './App.css';

function App() {
  const [companyname, setCompanyname] = useState('');
  const [categoryname, setCategoryname] = useState('');
  const [top, setTop] = useState(10);
  const [minPrice, setMinPrice] = useState(0);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const apiUrl = `http://28.244.56.144/test/companies/${companyname}/categories/${categoryname}/products?top=${top}&minPrice=${minPrice}`;
    try {
      const response = await axios.get(apiUrl, { timeout: 500 });
      setProducts(response.data.topProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Fetcher</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Company Name:
            <input type="text" value={companyname} onChange={(e) => setCompanyname(e.target.value)} required />
          </label>
          <label>
            Category Name:
            <input type="text" value={categoryname} onChange={(e) => setCategoryname(e.target.value)} required />
          </label>
          <label>
            Top N:
            <input type="number" value={top} onChange={(e) => setTop(e.target.value)} required />
          </label>
          <label>
            Min Price:
            <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} required />
          </label>
          <button type="submit">Fetch Products</button>
        </form>
        <ProductList products={products} />
      </header>
    </div>
  );
}

export default App;
