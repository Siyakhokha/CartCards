import productIdCleaner from './productIdCleaner';

const ShowProductaddedAlert = e => {
  let ProductaddedAlert = document.querySelector(
    `#${productIdCleaner(e)} .product-added`,
  );
  let ProductAlert = document.querySelector(
    `#${productIdCleaner(e)} .product-added.product-added-alert`,
  );
  let addToCart = document.querySelector(
    `#${productIdCleaner(e)} .bottomContentbox .yellow-btn`,
  );

  if (!ProductAlert) {
    if (ProductaddedAlert) {
      ProductaddedAlert.classList.add('product-added-alert');
      addToCart.classList.add('btn-disable');
    }
  } else {
    ProductaddedAlert.classList.remove('product-added-alert');
    addToCart.classList.remove('btn-disable');
  }
};

export default ShowProductaddedAlert;
