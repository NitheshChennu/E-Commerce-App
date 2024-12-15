export const calculateCartTotal = (items) => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const calculateTotalItems = (items) => {
  return items.reduce((total, item) => total + item.quantity, 0);
};