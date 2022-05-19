export const createItems = item => {
  return {
    id: item.node.id,
    quantity: item.node.quantity,
    merchandiseId: item.node.merchandise.id,
  };
};
