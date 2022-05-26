import React from 'react';

const WhatsInTheBox = ({ Item, Heading }) => {
  return (
    <div className="WhatsInTheBox">
      {Heading && <h3>{Heading}</h3>}
      {Item &&
        Item.length > 0 &&
        Item?.map((i, H) => {
          return (
            <div className="cards" key={H}>
              <div class="card-item" id={`cards-${H}`}>
                <img src={i?.item_image?.src} alt={i?.item_image?.alt} />
              </div>
              <p>{i?.item_text}</p>
            </div>
          );
        })}
    </div>
  );
};

export default WhatsInTheBox;
