import React from 'react';

const ProductPrice = ({ price, compareAtPriceV2 }) => {
  return (
    <div className="pricebox">
      {price && <h4 className="price">R{parseInt(price).toFixed(2)}</h4>}
      {compareAtPriceV2 && (
        <h4 className="compareAtPriceV2">
          R{parseInt(compareAtPriceV2).toFixed(2)}
        </h4>
      )}
    </div>
  );
};

export default ProductPrice;
