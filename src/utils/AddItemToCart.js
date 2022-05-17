import axios from 'axios';
import ShowProductaddedAlert from '../utils/ShowProductaddedAlert';
import { updateQuantity } from '../services/cart-service';

export const AddItemToCart = (
  event,
  merchandiseId,
  Id,
  cart,
  cartData,
  setCart,
  setItemAddedText,
  setEnableAddToCart
) => {
  event.preventDefault();
  //TODO: Refactoring below
    const localCart = JSON.parse(localStorage.getItem('cart'));
    setEnableAddToCart(false)

  if (cart?.id) {
    const existingLineItem = cartData?.items?.find(item => item.merchandiseId === merchandiseId)
    if (localCart?.itemsCount && !!existingLineItem) {
      const payload = {
        cartId: cart.id,
        lineId: existingLineItem.id,
        quantity: existingLineItem.quantity + 1
      }
      updateQuantity(payload)
        .then(response => {
          const lines = response?.data?.cartLinesUpdate?.cart?.lines?.edges;

          const newCart = lines?.length
            ? { ...cart, itemsCount: localCart.itemsCount + 1 }
            : { ...cart, itemsCount: 0 };
            updateCartState(Id, newCart, setCart, setItemAddedText, setEnableAddToCart)
          
        })
        .catch(error => {
          console.log(error);
        });
    }
    else {
      const latestCartQuantity = JSON.parse(localStorage.getItem('cart'))?.itemsCount || 0;
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
              itemsCount: latestCartQuantity + 1
            };
            setCart(newCart);
            localStorage.setItem('cart', JSON.stringify(newCart));
            window.dispatchEvent(new Event('storage'));
            setEnableAddToCart(true)
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
    }
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
          setEnableAddToCart(true)
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

const updateCartState = (Id, newCart, setCart, setItemAddedText, setEnableAddToCart) => {
  setCart(newCart);
  localStorage.setItem('cart', JSON.stringify(newCart));
  window.dispatchEvent(new Event('storage'));
  setEnableAddToCart(true)

  setItemAddedText('Item added to cart');
  setTimeout(() => {
    ShowProductaddedAlert(Id);
  }, 2000);
}