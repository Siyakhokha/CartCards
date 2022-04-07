import React, { useEffect, useState } from 'react';
import './App.scss';

const axios = require('axios');
const baseUrl = 'https://ikhokha-sandbox-ikhokha-20686580.hs-sites.com'

function App({ moduleData }) {
  const [ProductData, setProductData] = useState('');
  const [cart, setCart] = useState({ id: '', itemsCount: 0 });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'))

    if (cart?.id) {
      setCart(cart)
    }

    axios({
      method: 'post',
      url: `${baseUrl}/_hcms/api/getcollectionbyhandle`,
      data: { handle: 'card-machines' }
    }).then(response => {
      setProductData(response.data.data.collection.products.edges);
    }).catch(er => {
      console.log('error', er)
    })
  }, []);

  const addToCart = (event, merchandiseId) => {
    event.preventDefault();
    //TODO: Refactoring below
    if (cart?.id) {
      axios({
        method: 'post',
        url: `${baseUrl}/_hcms/api/addlineitem`,
        data: { cartId: cart.id, merchandiseId: merchandiseId, quantity: 1 }
      })
        .then((response) => {
          const responseData = response.data;
          const lineItems = responseData?.data?.cartLinesAdd?.cart?.lines?.edges

          if (lineItems && lineItems.length > 0) {
            const newCart = { ...cart, itemsCount: cart?.itemsCount + 1 }
            setCart(newCart)
            localStorage.setItem('cart', JSON.stringify(newCart))
            window.dispatchEvent(new Event('storage'))
            alert('item added')
          } else {
            console.log('coud not add line item')
          }

        }).catch((error) => {
          console.log(error)
        })
    } else {
      axios({
        method: 'post',
        url: `${baseUrl}/_hcms/api/createcart`,
        data: { merchandiseId: merchandiseId, quantity: 1 }
      })
        .then((response) => {
          const responseData = response.data;
          const createdCart = responseData?.data?.cartCreate?.cart

          if (createdCart?.id) {
            const newCart = { id: createdCart.id, itemsCount: 1 }
            localStorage.setItem('cart', JSON.stringify(newCart))
            window.dispatchEvent(new Event('storage'))
            setCart(newCart)
          } else {
            console.log('cart not created')
          }


        }).catch((error) => {
          console.log(error)
        })
    }
  };

  const getPrice = productId => {
    const product = ProductData?.find(p => p.node.handle === productId);
    return product;
  };

  return (
    <div className="cms-react-boilerplate__container">
      <div className="spinning-logo__container">
        {moduleData?.product_item?.length &&
          ProductData?.length &&
          moduleData.product_item.map((i, index) => {
            const productItem = getPrice(i.productid);

            return (
              <div className="item" key={index}>
                <div className="imagebox">
                  <img
                    src={
                      productItem?.node?.variants?.edges[0]?.node?.image
                        ?.originalSrc
                    }
                    alt=""
                  />
                </div>

                <div className="textbox">
                  <h3>{productItem?.node?.title}</h3>
                  <div className="pricebox">
                    <h4 className="Price">
                      R
                      {
                        productItem?.node?.variants?.edges[0]?.node?.priceV2
                          ?.amount
                      }
                    </h4>
                    <h4 className="compareAtPriceV2">
                      R
                      {
                        productItem?.node?.variants?.edges[0]?.node
                          ?.compareAtPriceV2?.amount
                      }
                    </h4>
                  </div>

                  <div className="des">
                    <p>{i.heading}</p>
                  </div>
                </div>
                <div className="icons">
                  {i.product_image &&
                    i?.product_image.map((icon, index) => {
                      return (
                        <div className="icon" key={index}>
                          <div className="imagebox">
                            <img src={icon?.src} alt="" />
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="bottomContentbox">
                  <span onClick={(event) => addToCart(event, productItem?.node?.variants?.edges[0]?.node?.id)}>add to cart </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
