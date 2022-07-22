import React from 'react';
// import ShowProductaddedAlert from '../../utils/ShowProductaddedAlert';
import {
  updateQuantity,
  createCart,
  addLineItem,
} from '../../services/cart-service';
import { addToCartEvent } from '../../utils/mparticle.utils';
import { ProductIdDecoded } from '../../utils/productIdCleaner';
import productTitleCleaner from '../../utils/productTitleCleaner';

const ButtonContainer = ({
  id,
  enableAddToCart,
  variantID,
  productCode,
  // cart,
  cartItems,
  setCart,
  setItemAddedText,
  setEnableAddToCart,
  ShowProductaddedAlert,
}) => {
  const getLocalCart = () => {
    return JSON.parse(localStorage.getItem('cart'));
  };

  const hideLoader = id => {
    const loaderContainer = document.getElementById(`loader_${id}`);
    loaderContainer.classList?.remove('shown-loader');
  };

  const showLoader = id => {
    const loaderContainer = document.getElementById(`loader_${id}`);
    loaderContainer.classList?.add('shown-loader');
  };

  const hideButtonText = id => {
    const textContainer = document.getElementById(`product_${id}`);
    textContainer.classList?.add('hidden-button-text');
  };

  const updateButtonText = id => {
    const textContainer = document.getElementById(`product_${id}`);
    textContainer.innerHTML = 'Added to cart';
    textContainer.classList?.remove('hidden-button-text');
  };

  const updateButtonContent = id => {
    hideLoader(id);
    updateButtonText(id);
    const textContainer = document.getElementById(`product_${id}`);
    textContainer.parentElement?.classList?.add('added-to-cart');

    setTimeout(() => {
      textContainer.innerHTML = 'Add to cart';
      textContainer.parentElement?.classList?.remove('added-to-cart');
      setEnableAddToCart(true);
    }, 2000);
  };

  const setProcessingState = id => {
    setEnableAddToCart(false);
    showLoader(id);
    hideButtonText(id);
  };

  const AddItemToCart = (event, id) => {
    event.preventDefault();
    setProcessingState(id);

    const localCart = JSON.parse(localStorage.getItem('cart'));
    if (!!localCart?.id) {
      updateItems(localCart, id);
    } else {
      createNewCart(id);
    }
  };

  const updateItems = (localCart, id) => {
    const existingItem = cartItems?.find(
      item => item.merchandise?.id === variantID,
    );
    if (localCart.itemsCount > 0 && !!existingItem) {
      updateItemQuantity(existingItem, id);
    } else {
      addNewLineItem(id);
    }
  };

  const addNewLineItem = id => {
    const latestCart = getLocalCart();
    addLineItem({
      cartId: latestCart.id,
      merchandiseId: variantID,
      quantity: 1,
    })
      .then(response => {
        const errors = response?.data?.cartLinesAdd?.userErrors;
        if (errors && errors.length > 0) {
          handleErrorState('AddNewLine', errors);
        } else {
          const latestCartQuantity = latestCart?.itemsCount || 0;
          const newCart = {
            ...latestCart,
            itemsCount: latestCartQuantity + 1,
          };
          const responseData = response?.data?.cartLinesAdd?.cart;
          const item = responseData?.lines?.edges?.find(
            item => item?.node?.merchandise?.id === variantID,
          );
          const discount = responseData?.discountCodes?.find(
            codes => codes.applicable,
          );
          updateCartState(newCart, id, item, discount);
        }
      })
      .catch(error => {
        handleErrorState('AddNewLine', error);
      });
  };

  const updateItemQuantity = (existingLineItem, id) => {
    const localCart = getLocalCart();
    const payload = {
      cartId: localCart.id,
      lineId: existingLineItem.id,
      quantity: existingLineItem.quantity + 1,
    };
    updateQuantity(payload)
      .then(response => {
        const errors = response?.data?.cartLinesUpdate?.userErrors;
        if (errors && errors.length > 0) {
          handleErrorState('UpdateQuantity', errors);
        } else {
          const localItemsCout = localCart?.itemsCount || 0;
          const responseData = response?.data?.cartLinesUpdate?.cart;
          const lines = responseData?.lines?.edges;
          const newCart = lines?.length
            ? { ...localCart, itemsCount: localItemsCout + 1 }
            : { ...localCart, itemsCount: 0 };
          const item = responseData?.lines?.edges?.find(
            item => item.node.id === existingLineItem.id,
          );
          const discount = responseData?.discountCodes?.find(
            codes => codes.applicable,
          );
          updateCartState(newCart, id, item, discount);
        }
      })
      .catch(error => {
        handleErrorState('UpdateQuantity', error);
      });
  };

  const createNewCart = id => {
    createCart({ merchandiseId: variantID, quantity: 1 })
      .then(response => {
        const errors = response?.data?.cartCreate?.userErrors;
        if (errors && errors.length > 0) {
          handleErrorState('CreateCart', errors);
        } else {
          const createdCart = response?.data?.cartCreate?.cart;
          const newCart = { id: createdCart?.id, itemsCount: 1 };
          const discount = createdCart?.discountCodes?.find(
            codes => codes.applicable,
          );
          updateCartState(newCart, id, createdCart?.lines?.edges[0], discount);
        }
      })
      .catch(error => {
        handleErrorState('CreateCart', error);
      });
  };

  const calculateTaxes = total => {
    const taxPercentage = 0.1304347826086957;
    return (total * taxPercentage).toFixed(2);
  };

  const sendMparticleEvent = (item, discount) => {
    const price = item?.node?.merchandise?.priceV2.amount;
    const validDiscount = item?.node?.discountAllocations?.find(
      discAll => discAll?.discountedAmount?.amount > 0,
    );
    const discountCode = !!discount && !!validDiscount ? discount.code : null;
    addToCartEvent(
      item?.node?.merchandise?.image?.src,
      productTitleCleaner(item?.node?.merchandise?.product?.title),
      1,
      price,
      calculateTaxes(price),
      discountCode,
      ProductIdDecoded(productCode),
    );
  };

  const updateCartState = (newCart, id, item, discount) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('quantity-updated'));
    updateButtonContent(id);
    sendMparticleEvent(item, discount);
  };

  const handleErrorState = (location, error) => {
    console.log(`Error: ${location} ${error}`);
    setItemAddedText('Could not add item');
    setTimeout(() => {
      ShowProductaddedAlert(id);
    }, 1000);
  };

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
          }}
        >
          <div id={`product_${id}`}>Add to Cart</div>
          <div id={`loader_${id}`} className="add-to-cart-loader">
            <div className="product-loader"></div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ButtonContainer;
