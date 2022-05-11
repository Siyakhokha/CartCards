import React from 'react';
import { showToolTip } from '../../utils/showToolTip';

const ValueAddedServices = ({ Values, Productid }) => {
  return (
    <div className="accepted-payments icons">
      {Values &&
        Values?.map((services, H) => {
          return (
            <div className="Value_added_services" key={H}>
              <div className="services">
                <p>{services?.value_added_services_text}</p>
                <span class="tooltips" id={`cards-${H}`}>
                  <img
                    onMouseLeave={() => {
                      showToolTip(Productid);
                    }}
                    onMouseOver={() => {
                      showToolTip(Productid);
                    }}
                    src={services?.value_added_services_tooltip_image?.src}
                    alt={services?.value_added_services_tooltip_image?.alt}
                  />
                  <span class="tooltipstext">
                    {services?.value_added_services_tooltip_text}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ValueAddedServices;
