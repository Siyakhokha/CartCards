import React from 'react';

const AcceptedPaymentsIcons = ({ icons }) => {
  return (
    <div className="accepted-payments icons">
      {icons &&
        icons?.map((icon, index) => {
          return (
            <div className="icon" key={index}>
              <div className="imagebox">
                <img src={icon?.src} alt="" />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default AcceptedPaymentsIcons;
