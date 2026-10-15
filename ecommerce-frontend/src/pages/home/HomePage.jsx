import axios  from 'axios';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import ProductsGrid from './ProductsGrid';
import './HomePage.css';

function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const getProductsData = async () => {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    };
    getProductsData();
  }, []);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
      <title>Ecommerce Project</title>
      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}

export default HomePage;