import React from 'react';
import { AddItemToCart } from '../../utils/AddItemToCart';

const ButtonContainer = ({
  id,
  enableAddToCart,
  variantID,
  cart,
  CartData,
  setCart,
  setItemAddedText,
  setEnableAddToCart,
  ShowProductaddedAlert,
}) => {
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
            AddItemToCart(
              event,
              variantID,
              id,
              cart,
              CartData,
              setCart,
              setItemAddedText,
              setEnableAddToCart,
            );
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
