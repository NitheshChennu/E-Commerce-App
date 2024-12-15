export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPrice = (price) => {
  return !isNaN(price) && price >= 0;
};

export const isValidQuantity = (quantity) => {
  return !isNaN(quantity) && quantity > 0 && Number.isInteger(Number(quantity));
};