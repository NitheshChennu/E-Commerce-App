import React, { useState, useEffect } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getProducts } from '../../services/api';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carouselSlides = [
    {
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da',
      title: 'New Arrivals',
      description: 'Check out our latest collection'
    },
    {
      image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f',
      title: 'Summer Sale',
      description: 'Up to 50% off on selected items'
    },
    {
      image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae',
      title: 'Special Offers',
      description: 'Limited time deals'
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home">
      <Carousel slides={carouselSlides} />
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;