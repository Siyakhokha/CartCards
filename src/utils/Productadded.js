import React from 'react';

function Productadded({ ItemAddedText }) {
  return (
    <div className="product-added">
      <div>
        <p>{ItemAddedText}</p>
      </div>
      <p>X</p>
    </div>
  );
}

export default Productadded;
