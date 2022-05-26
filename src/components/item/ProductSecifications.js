import React from 'react';

const ProductSecifications = ({ secifications }) => {
  return (
    <>
      <div className="icons">
        {secifications &&
          secifications.length > 0 &&
          secifications?.map((icon, index) => {
            return (
              <div className="icon" key={index}>
                <div className="imagebox">
                  <img src={icon?.secification_image?.src} alt="" />
                </div>
                <p>{icon?.secifications_text}</p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ProductSecifications;
