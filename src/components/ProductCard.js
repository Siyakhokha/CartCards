import React, { useEffect, useState } from 'react';
import { getCart } from '../services/cart-service';
import { createCartData } from '../utils/createCartData';
import { getCollectionHandle } from '../utils/getCollectionHandle';
import { getPrice } from '../utils/getPrice';
import Loading from '../utils/Loading/Loading';
import Productadded from '../utils/Productadded';
import productIdCleaner from '../utils/productIdCleaner';
import productTitleCleaner from '../utils/productTitleCleaner';
import ShowProductaddedAlert from '../utils/ShowProductaddedAlert';
import AcceptedPaymentsHeading from './item/AcceptedPaymentsHeading';
import AcceptedPaymentsIcons from './item/AcceptedPaymentsIcons';
import BackToTopBtn from './item/BackToTopBtn';
import ButtonContainer from './item/ButtonContainer';
import Filter from './item/Filter';
import ProductDescription from './item/ProductDescription';
import ProductImage from './item/ProductImage';
import ProductName from './item/ProductName';
import ProductPrice from './item/ProductPrice';
import ProductSecifications from './item/ProductSecifications';
import ValueAddedServices from './item/ValueAddedServices';
import WhatsInTheBox from './item/WhatsInTheBox';

const ProductCard = ({ moduleData }) => {
  const [ItemAddedText, setItemAddedText] = useState('Adding item to cart.');
  const [ProductData, setProductData] = useState('');
  const [RawProductData, setRawProductData] = useState('');
  const [CartData, setCartData] = useState(null);
  const [enableAddToCart, setEnableAddToCart] = useState(true);
  const [cart, setCart] = useState({
    id: '',
    itemsCount: 0,
  });
  const [load, setload] = useState(false);
  const [OnError, setOnError] = useState(false);


  useEffect(() => {
    window?.addEventListener("cart-items", updateCartItems);

    getCollectionHandle(
      setProductData,
      moduleData?.collection_id,
      setload,
      setRawProductData,
      setOnError,
    );
  }, []);
  
  const updateCartItems = (event) => {
    setCartData(event.detail)
  }

  return (
    <>
      {load && !OnError && (
        <div
          id={moduleData?.collection_id}
          className={`cms-react-boilerplate__container  ${moduleData?.collection_id}`}
        >
          <div className="container">
            <div className="Heading">
              <h1>{moduleData.heading}</h1>
              <BackToTopBtn
                id={moduleData?.collection_id}
                position="top"
                mobile="MobileHide"
              />
              <Filter
                id={moduleData?.collection_id}
                setProductData={setProductData}
                ProductData={ProductData}
                NewproductData={RawProductData}
              />
            </div>
          </div>
          <div
            className={`spinning-logo__container container  ${moduleData?.collection_id}`}
          >
            {moduleData?.product_item?.length &&
              ProductData?.length &&
              moduleData?.product_item?.map((i, index) => {
                const productItem = getPrice(i?.productid, ProductData);
                return (
                  <div
                    id={productIdCleaner(i.productid)}
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
                        {productItem?.node?.title && (
                          <ProductName
                            Name={productTitleCleaner(productItem?.node?.title)}
                          />
                        )}
                        <div className="ProductDescription">
                          {productItem?.node?.variants?.edges[0]?.node?.priceV2
                            ?.amount && (
                            <ProductPrice
                              price={
                                productItem?.node?.variants?.edges[0]?.node
                                  ?.priceV2?.amount
                              }
                              compareAtPriceV2={
                                productItem?.node?.variants?.edges[0]?.node
                                  ?.compareAtPriceV2?.amount
                              }
                            />
                          )}
                          {i?.heading && (
                            <ProductDescription Description={i?.heading} />
                          )}
                        </div>
                      </div>
                      {i?.secifications && (
                        <ProductSecifications
                          secifications={i?.secifications}
                        />
                      )}
                      {i?.accepted_payments_heading && (
                        <AcceptedPaymentsHeading
                          heading={i?.accepted_payments_heading}
                        />
                      )}
                      {i?.accepted_payments && (
                        <AcceptedPaymentsIcons icons={i?.accepted_payments} />
                      )}
                      {i?.value_added_services && i?.productid && (
                        <ValueAddedServices
                          Values={i?.value_added_services}
                          Productid={i?.productid}
                        />
                      )}
                      <ButtonContainer
                        id={i?.productid}
                        enableAddToCart={enableAddToCart}
                        variantID={
                          productItem?.node?.variants?.edges[0]?.node?.id
                        }
                        cart={cart}
                        cartItems={CartData?.items}
                        setCart={setCart}
                        setItemAddedText={setItemAddedText}
                        setEnableAddToCart={setEnableAddToCart}
                        ShowProductaddedAlert={ShowProductaddedAlert}
                      />
                    </div>
                    {i?.Item && i?.Item.length > 0 && (
                      <WhatsInTheBox
                        Item={i?.Item}
                        Heading={i?.WhatsInTheBoxHeading}
                      />
                    )}
                  </div>
                );
              })}
          </div>
          {moduleData?.collection_id != 'card-machines' && (
            <div className="container bottom">
              <div className="Heading">
                <h1>&nbsp;</h1>
                <BackToTopBtn
                  id={moduleData?.collection_id}
                  position="bottom"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {!load && <Loading OnError={OnError} id={moduleData?.collection_id} />}
    </>
  );
};

export default ProductCard;
