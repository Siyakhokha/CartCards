import React from 'react';
// import ShowProductaddedAlert from '../../utils/ShowProductaddedAlert';
import { updateQuantity, createCart, addLineItem } from '../../services/cart-service';

const ButtonContainer = ({
  id,
  enableAddToCart,
  variantID,
  cart,
  cartItems,
  setCart,
  setItemAddedText,
  setEnableAddToCart,
  ShowProductaddedAlert,
}) => { 

  const cartHasItems = (localCart) => {
    return !!localCart?.id && localCart?.itemsCount > 0;
  }

  const getLocalCart = () => {
    return JSON.parse(localStorage.getItem('cart'))
  }

  const AddItemToCart = (event) => {
    event.preventDefault();
    
    const localCart = JSON.parse(localStorage.getItem('cart'));
    setEnableAddToCart(false);
    
    if (cartHasItems(localCart)) {
      updateItems()
    } else {
      createNewCart()
    }
  }

  const updateItems = () => {
    const existingItem = cartItems?.find(item => item.merchandise?.id === variantID)
    if (!!existingItem) {
      updateItemQuantity(existingItem)
    } else {
      addNewLineItem()
    }
  }

  const addNewLineItem = () => {
    const latestCart = getLocalCart()
    addLineItem({ cartId: latestCart.id, merchandiseId: variantID, quantity: 1 })
      .then(response => {
        const errors = response?.data?.cartLinesAdd?.userErrors;
        if (errors && errors.length > 0) {
          handleErrorState('AddNewLine', errors)
        } else {
          const latestCartQuantity = latestCart?.itemsCount || 0;
          const newCart = {
            ...latestCart,
            itemsCount: latestCartQuantity + 1,
          };
          updateCartState(newCart);
        }
      })
      .catch((error) => {
        handleErrorState('AddNewLine', error)
      });
  }

  const updateItemQuantity = (existingLineItem) => {
    const localCart = getLocalCart()
    const payload = {
      cartId: localCart.id,
      lineId: existingLineItem.id,
      quantity: existingLineItem.quantity + 1,
    };
    updateQuantity(payload)
      .then(response => {
        const errors = response?.data?.cartLinesUpdate?.userErrors;
        if (errors && errors.length > 0) {
          handleErrorState('UpdateQuantity', errors)
        } else {
          const localItemsCout = localCart?.itemsCount || 0;
          const lines = response?.data?.cartLinesUpdate?.cart?.lines?.edges;
          const newCart = lines?.length
            ? { ...localCart, itemsCount: localItemsCout + 1 }
            : { ...localCart, itemsCount: 0 };
          updateCartState(newCart);
        }
      })
      .catch(error => {
        handleErrorState('UpdateQuantity', error)
      });
  }

  const createNewCart = () => {
    createCart({ merchandiseId: variantID, quantity: 1 })
      .then(response => {
        const errors = response?.data?.cartCreate?.userErrors;
        if (errors && errors.length > 0) {
          handleErrorState('CreateCart', errors)
        } else {
          const createdCart = response?.data?.cartCreate?.cart;
          const newCart = { id: createdCart?.id, itemsCount: 1 };
          updateCartState(newCart);
        }
      })
      .catch(error => {
        handleErrorState('CreateCart', error)
      });
  }

  const updateCartState = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('quantity-updated'));
    setEnableAddToCart(true);

    setItemAddedText('Item added to cart');
    setTimeout(() => {
      ShowProductaddedAlert(id);
    }, 1000);
  };

  const handleErrorState = (location, error) => {
    console.log(`Error: ${location} ${error}`);
    setItemAddedText('Could not add item');
    setTimeout(() => {
      ShowProductaddedAlert(id);
    }, 1000)
  }

  return (
    <div>
      <div className="bottomContentbox">
        <a href={'/' + id} className="white-btn">
          Learn more
        </a>
        <a
          href=""
          className={`yellow-btn ${!enableAddToCart ? 'btn-disable' : ''}`}
          onClick={event => {
            AddItemToCart(event);
            ShowProductaddedAlert(id);
          }}
        >
          Add to cart
        </a>
      </div>
    </div>
  );
};

export default ButtonContainer;
