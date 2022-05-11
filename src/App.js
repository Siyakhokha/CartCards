import React, { useEffect, useState } from 'react';
import './App.scss';
import AcceptedPaymentsHeading from './components/item/AcceptedPaymentsHeading';
import AcceptedPaymentsIcons from './components/item/AcceptedPaymentsIcons';
import ProductDescription from './components/item/ProductDescription';
import ProductImage from './components/item/ProductImage';
import ProductName from './components/item/ProductName';
import ProductPrice from './components/item/ProductPrice';
import ProductSecifications from './components/item/ProductSecifications';
import ValueAddedServices from './components/item/ValueAddedServices';
import ProductCard from './components/ProductCard';
import Productadded from './utils/Productadded.js';
import productTitleCleaner from './utils/productTitleCleaner';
import ShowProductaddedAlert from './utils/ShowProductaddedAlert';
import { getCollectionHandle } from './utils/getCollectionHandle';
import { AddItemToCart } from './utils/AddItemToCart';

function App({ moduleData }) {
  const [ItemAddedText, setItemAddedText] = useState('Adding item to cart.');
  const [ProductData, setProductData] = useState('');
  const [cart, setCart] = useState({ id: '', itemsCount: 0 });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (cart?.id) {
      setCart(cart);
    }

    getCollectionHandle(setProductData, moduleData?.collection_id);
  }, []);

  const getPrice = productId => {
    const product = ProductData?.find(p => p.node.handle === productId);
    return product;
  };

  return (
    <>
      <div className="cms-react-boilerplate__container ">
        <div
          className={`spinning-logo__container  ${moduleData?.collection_id}`}
        >
          {moduleData?.product_item?.length &&
            ProductData?.length &&
            moduleData.product_item.map((i, index) => {
              const productItem = getPrice(i.productid);

              return (
                <div
                  id={i.productid}
                  className={`item  ${moduleData?.collection_id}`}
                  key={index}
                >
                  <Productadded
                    ItemAddedText={ItemAddedText}
                    ProductName={productTitleCleaner(productItem?.node?.title)}
                  />
                  <ProductImage
                    Image={
                      productItem?.node?.media?.edges[0]?.node?.previewImage
                        ?.originalSrc
                    }
                  />
                  <div className="specifications">
                    <div className="textbox">
                      <ProductName
                        Name={productTitleCleaner(productItem?.node?.title)}
                      />
                      <ProductPrice
                        price={
                          productItem?.node?.variants?.edges[0]?.node?.priceV2
                            ?.amount
                        }
                        compareAtPriceV2={
                          productItem?.node?.variants?.edges[0]?.node
                            ?.compareAtPriceV2?.amount
                        }
                      />

                      <ProductDescription Description={i.heading} />
                    </div>
                    <div className="icons">
                      {i.secifications &&
                        i?.secifications.map((icon, index) => {
                          return (
                            <ProductSecifications
                              text={icon?.secifications_text}
                              image={icon?.secification_image?.src}
                              index={index}
                            />
                          );
                        })}
                    </div>
                    <AcceptedPaymentsHeading
                      heading={i.accepted_payments_heading}
                    />
                    <AcceptedPaymentsIcons icons={i.accepted_payments} />
                    <ValueAddedServices
                      Values={i.value_added_services}
                      Productid={i.productid}
                    />

                    <div className="bottomContentbox">
                      <a href={'/' + i.productid} className="white-btn">
                        Learn more
                      </a>
                      <a
                        href=""
                        className="yellow-btn"
                        onClick={event => {
                          AddItemToCart(
                            event,
                            productItem?.node?.variants?.edges[0]?.node?.id,
                            i.productid,
                            cart,
                            setCart,
                            setItemAddedText,
                          );
                          ShowProductaddedAlert(i.productid);
                        }}
                      >
                        Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {/* <ProductCard /> */}
    </>
  );
}

export default App;
