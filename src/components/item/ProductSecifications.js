import React from 'react';

const ProductSecifications = ({ text, image, index }) => {
  return (
    <div className="icon" key={index}>
      <div className="imagebox">
        <img src={image} alt="" />
      </div>
      <p>{text}</p>
    </div>
  );
};

export default ProductSecifications;
