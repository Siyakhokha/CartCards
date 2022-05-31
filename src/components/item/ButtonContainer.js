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

  const getLocalCart = () => {
    return JSON.parse(localStorage.getItem('cart'))
  }
  
  const hideLoader = (id) => {
    const loaderContainer = document.getElementById(`loader_${id}`)
    loaderContainer.classList?.remove('shown-loader')
  }

  const showLoader = (id) => {
    const loaderContainer = document.getElementById(`loader_${id}`)
    loaderContainer.classList?.add('shown-loader')
  }

  const hideButtonText = (id) => {
    const textContainer = document.getElementById(`product_${id}`)
    textContainer.classList?.add('hidden-button-text')
  }

  const updateButtonText = (id) => {
    const textContainer = document.getElementById(`product_${id}`)
    textContainer.innerHTML = 'Added to cart'
    textContainer.classList?.remove('hidden-button-text')
  }

  const updateButtonContent = (id) => {
    hideLoader(id)
    updateButtonText(id)
    const textContainer = document.getElementById(`product_${id}`)
    textContainer.parentElement?.classList?.add('added-to-cart')

    setTimeout(() => {
      textContainer.innerHTML = 'Add to cart'
      textContainer.parentElement?.classList?.remove('added-to-cart')
      setEnableAddToCart(true);
    }, 3000);
  }
  
  const setProcessingState = (id) => {
    setEnableAddToCart(false)
    showLoader(id)
    hideButtonText(id)
  }
  
  const AddItemToCart = (event, id) => {
    event.preventDefault();
    setProcessingState(id)
    
    const localCart = JSON.parse(localStorage.getItem('cart'));
    if (!!localCart?.id) {
      updateItems(localCart, id)
    } else {
      createNewCart(id)
    }
  }

  const updateItems = (localCart, id) => {
    const existingItem = cartItems?.find(item => item.merchandise?.id === variantID)
    if (localCart.itemsCount > 0 && !!existingItem) {
      updateItemQuantity(existingItem, id)
    } else {
      addNewLineItem(id)
    }
  }

  const addNewLineItem = (id) => {
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
          updateCartState(newCart, id);
        }
      })
      .catch((error) => {
        handleErrorState('AddNewLine', error)
      });
  }

  const updateItemQuantity = (existingLineItem, id) => {
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
          updateCartState(newCart, id);
        }
      })
      .catch(error => {
        handleErrorState('UpdateQuantity', error)
      });
  }

  const createNewCart = (id) => {
    createCart({ merchandiseId: variantID, quantity: 1 })
      .then(response => {
        const errors = response?.data?.cartCreate?.userErrors;
        if (errors && errors.length > 0) {
          handleErrorState('CreateCart', errors)
        } else {
          const createdCart = response?.data?.cartCreate?.cart;
          const newCart = { id: createdCart?.id, itemsCount: 1 };
          updateCartState(newCart, id);
        }
      })
      .catch(error => {
        handleErrorState('CreateCart', error)
      });
  }

  const updateCartState = (newCart, id) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('quantity-updated'));
    updateButtonContent(id)
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
            AddItemToCart(event, id);
           // ShowProductaddedAlert(id);
          }}
        >
          <div id={`product_${id}`}>Add to Cart</div>
                <div id={`loader_${id}`} className="add-to-cart-loader">
                  <div className="product-loader">
                  </div>
                </div>
        </a>
      </div>
    </div>
  );
};

export default ButtonContainer;
