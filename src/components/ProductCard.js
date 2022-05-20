import React, { useEffect, useState } from 'react';
import { getCart } from '../services/cart-service';
import { createCartData } from '../utils/createCartData';
import { getCollectionHandle } from '../utils/getCollectionHandle';
import { getPrice } from '../utils/getPrice';
import Productadded from '../utils/Productadded';
import productTitleCleaner from '../utils/productTitleCleaner';
import ShowProductaddedAlert from '../utils/ShowProductaddedAlert';
import AcceptedPaymentsHeading from './item/AcceptedPaymentsHeading';
import AcceptedPaymentsIcons from './item/AcceptedPaymentsIcons';
import ButtonContainer from './item/ButtonContainer';
import ProductDescription from './item/ProductDescription';
import ProductImage from './item/ProductImage';
import ProductName from './item/ProductName';
import ProductPrice from './item/ProductPrice';
import ProductSecifications from './item/ProductSecifications';
import ValueAddedServices from './item/ValueAddedServices';
import WhatsInTheBox from './item/WhatsInTheBox';

function ProductCard({ moduleData, setload, load }) {
  const [ItemAddedText, setItemAddedText] = useState('Adding item to cart.');
  const [ProductData, setProductData] = useState('');
  const [CartData, setCartData] = useState(null);
  const [Reload, setReload] = useState(false);
  const [enableAddToCart, setEnableAddToCart] = useState(true);
  const [cart, setCart] = useState({ id: '', itemsCount: 0 });

  useEffect(() => {
    window.addEventListener('storage', quantityChange);
    getCollectionHandle(
      setProductData,
      moduleData?.collection_id,
      setload,
      load,
    );
  }, []);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart?.id) {
      setCart(cart);
      getCart({ cartId: cart.id })
        .then(resp => {
          const newCartData = createCartData(resp?.data?.cart);
          setCartData(newCartData);
        })
        .catch(er => {
          console.log('error', er);
        });
    } else {
      setCartData(null);
      setCart({ id: '', itemsCount: 0 });
    }
  }, [Reload]);

  const quantityChange = () => {
    setReload(prevLoad => {
      return !prevLoad;
    });
  };

  return (
    <>
      <div
        className={`cms-react-boilerplate__container  ${moduleData?.collection_id}`}
      >
        <div className="container">
          <div className="Heading">
            <h1>{moduleData.heading}</h1>
          </div>
        </div>
        <div
          className={`spinning-logo__container container  ${moduleData?.collection_id}`}
        >
          {moduleData?.product_item?.length &&
            ProductData?.length &&
            moduleData.product_item.map((i, index) => {
              const productItem = getPrice(i.productid, ProductData);

              return (
                <div
                  id={i.productid}
                  className={`item  ${moduleData?.collection_id}`}
                  key={index}
                >
                  <Productadded ItemAddedText={ItemAddedText} />
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
                      <div className="ProductDescription">
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
                    </div>
                    {i.secifications && (
                      <ProductSecifications secifications={i.secifications} />
                    )}
                    <AcceptedPaymentsHeading
                      heading={i.accepted_payments_heading}
                    />
                    <AcceptedPaymentsIcons icons={i.accepted_payments} />
                    <ValueAddedServices
                      Values={i.value_added_services}
                      Productid={i.productid}
                    />
                    <ButtonContainer
                      id={i.productid}
                      enableAddToCart={enableAddToCart}
                      variantID={
                        productItem?.node?.variants?.edges[0]?.node?.id
                      }
                      cart={cart}
                      CartData={CartData}
                      setCart={setCart}
                      setItemAddedText={setItemAddedText}
                      setEnableAddToCart={setEnableAddToCart}
                      ShowProductaddedAlert={ShowProductaddedAlert}
                    />
                  </div>
                  {i.Item && (
                    <WhatsInTheBox
                      Item={i.Item}
                      Heading={i.WhatsInTheBoxHeading}
                    />
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default ProductCard;
