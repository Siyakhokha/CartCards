import React from 'react';

const ProductImage = ({ Image }) => {
  return (
    <div className="imagebox">
      <img src={Image} alt="" />
    </div>
  );
};

export default ProductImage;
