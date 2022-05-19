export const getPrice = (productId, ProductData) => {
  const product = ProductData?.find(p => p.node.handle === productId);
  return product;
};
