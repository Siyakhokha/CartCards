//eCommerce Add To Cart Event
export const addToCartEvent = (
  productImage,
  productName,
  quantity,
  total,
  taxes,
  discount
) => {
  let product = mParticle.eCommerce.createProduct(
    productName, // Name
    productName, // SKU
    parseInt(total), // Price
    parseInt(quantity), // Quantity
    "Card Machines",
    "card-machines",
    "iKhokha",
    1,
    discount,
    {
      sku: productName,
      image_url: productImage,
    }
  );

  let transactionAttributes = {
    Affiliation: "Hubspot Website",
    Id: 0,
    Revenue: parseInt(total),
    Tax: parseInt(taxes),
    Shipping: 100,
    Step: 1,
  };
  let customAttributes = {
    braze_abandoned_cart: "true",
    event_source: "Online",
    cart_total: parseInt(total),
    currency_code: "ZAR",
  };
  let customFlags = {
    "Facebook.EventSourceUrl": window.location.href,
    "Google.Category": "ecommerce",
    "Google.Label": "Purchase Journey 2",
    "Google.Value": parseInt(total),
    "Google.Location": window.location.href,
    "Google.Hostname": window.location.hostname,
    "Google.Page": window.location.pathname,
    "Google.DocumentReferrer": document.referrer,
  };

  mParticle.eCommerce.logProductAction(
    mParticle.ProductActionType.AddToCart,
    [product],
    customAttributes,
    customFlags,
    transactionAttributes
  );

  mParticle.eCommerce.setCurrencyCode("ZAR");
};
