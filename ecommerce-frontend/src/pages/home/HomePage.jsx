import axios  from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import Header from '../../components/Header';
import ProductsGrid from './ProductsGrid';
import './HomePage.css';

function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  
  useEffect(() => {
    const getProductsData = async () => {
      let response;
      if(search) {
        response = await axios.get(`/api/products?search=${search}`)
      } else {
        response = await axios.get('/api/products');
      }
      setProducts(response.data);
    };
    getProductsData();
  }, [search]);

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