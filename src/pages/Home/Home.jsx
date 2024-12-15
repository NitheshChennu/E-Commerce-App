import { useState, useEffect } from 'react';
import Carousel from '../../components/Carousel/Carousel';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getProducts } from '../../utils/api';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
      title: 'Shop the Latest Trends',
      description: 'Discover our new collection'
    },
    {
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc',
      title: 'Special Offers',
      description: 'Up to 50% off on selected items'
    },
    {
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04',
      title: 'New Arrivals',
      description: 'Check out our latest products'
    }
  ];

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        if (mounted) {
          setProducts(Array.isArray(data) ? data : []);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err.toString());
          setProducts([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, []);

  const handleAddToCart = (product) => {
    // TODO: Implement cart functionality
    console.log('Added to cart:', product);
  };

  if (loading) {
    return (
      <div className="home">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home">
        <div className="error-message">
          Error loading products: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <Carousel slides={slides} />
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;