import React, { useEffect, useState } from 'react';
import './App.scss';
import fields from '../src/modules/app.module/fields.json';

function App({ moduleData }) {
  // eslint-disable-next-line no-console
  // console.log(
  //   'all of your data typically accessed via the "module" keyword in HubL is available as JSON here!',
  //   moduleData,
  // );
  const [Images, setImages] = useState('');
  const [ProductData, setProductData] = useState('');
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    getCollectByID();
  }, []);

  console.log('moduleData:', moduleData);

  const getCollectByID = () => {
    const axios = require('axios');
    let data = JSON.stringify({
      query: `query CollectionByHandle($collectionHandle:String!) {
  collectionByHandle(handle: $collectionHandle) {
    image {
      src
    }
    title
    products(first: 100) {
      edges {
        node {
          id
          handle
          title
          onlineStoreUrl
          media(first: 1) {
            edges {
              node {
                alt
                mediaContentType
                previewImage {
                  originalSrc
                }
              }
            }
          }
          variants(first: 5) {
            edges {
              node {
                compareAtPriceV2 {
                  amount
                }
                priceV2 {
                  amount
                }
              }
            }
          }
              descriptionTagYotpoReviewsAvg: metafield(
        namespace: "yotpo"
        key: "reviews_average"
      ) {
        value
        type
      }
        }
      }
    }
  }
}`,
      variables: { collectionHandle: 'card-machines' },
    });

    let config = {
      method: 'post',
      url: 'https://ikhokha.myshopify.com/api/2021-07/graphql.json',
      headers: {
        'X-Shopify-Storefront-Access-Token': '8ee7fbad1afb2c1b468bbba4b4bf6dfd',
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios(config)
      .then(response => {
        console.log(response.data.data.collectionByHandle.products.edges);
        setProductData(response.data.data.collectionByHandle.products.edges);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getPrice = productId => {
    const product = ProductData?.find(p => p.node.id === productId);
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
                      productItem?.node?.media?.edges[0]?.node?.previewImage
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
                  <span>add to cart </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
