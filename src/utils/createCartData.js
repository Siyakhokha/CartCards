import { createItems } from './createItems';

export const createCartData = cartResponse => {
  return {
    id: cartResponse?.id,
    items: cartResponse?.lines?.edges?.map(item => createItems(item)),
  };
};
