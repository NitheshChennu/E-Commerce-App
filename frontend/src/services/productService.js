export const filterProducts = (products, category) => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

export const sortProducts = (products, sortBy) => {
  const sortedProducts = [...products];
  
  switch (sortBy) {
    case 'price-low':
      return sortedProducts.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sortedProducts.sort((a, b) => b.price - a.price);
    case 'name':
    default:
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  }
};