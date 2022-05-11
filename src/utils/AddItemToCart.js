import axios from 'axios';
import ShowProductaddedAlert from '../utils/ShowProductaddedAlert';

export const AddItemToCart = (
  event,
  merchandiseId,
  Id,
  cart,
  setCart,
  setItemAddedText,
) => {
  event.preventDefault();
  //TODO: Refactoring below

  if (cart?.id) {
    const latestCartQuantity =
      JSON.parse(localStorage.getItem('cart'))?.itemsCount || 0;
    axios({
      method: 'post',
      url: `${window.location.origin}/_hcms/api/addlineitem`,
      data: {
        cartId: cart.id,
        merchandiseId: merchandiseId,
        quantity: 1,
      },
    })
      .then(response => {
        const responseData = response.data;
        const lineItems = responseData?.data?.cartLinesAdd?.cart?.lines?.edges;

        if (lineItems && lineItems.length > 0) {
          const newCart = {
            ...cart,
            itemsCount: latestCartQuantity + 1,
          };
          setCart(newCart);
          localStorage.setItem('cart', JSON.stringify(newCart));
          window.dispatchEvent(new Event('storage'));
          setItemAddedText('Item added to cart');
          setTimeout(() => {
            ShowProductaddedAlert(Id);
          }, 2000);
        } else {
          console.log('coud not add line item');
        }
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    axios({
      method: 'post',
      url: `${window.location.origin}/_hcms/api/createcart`,
      data: { merchandiseId: merchandiseId, quantity: 1 },
    })
      .then(response => {
        const responseData = response.data;
        const createdCart = responseData?.data?.cartCreate?.cart;
        if (createdCart?.id) {
          const newCart = { id: createdCart.id, itemsCount: 1 };
          localStorage.setItem('cart', JSON.stringify(newCart));
          window.dispatchEvent(new Event('storage'));
          setCart(newCart);
          setItemAddedText('Item added to cart');
          setTimeout(() => {
            ShowProductaddedAlert(Id);
          }, 2000);
        } else {
          console.log('cart not created');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
