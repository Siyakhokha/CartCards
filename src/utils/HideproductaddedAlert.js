const HideproductaddedAlert = e => {
  let ProductaddedAlert = document.querySelector(`#${e} .product-added`);
  let addToCart = document.querySelector(`#${e} .bottomContentbox .yellow-btn`);

  if (ProductaddedAlert) {
    ProductaddedAlert.classList.add('product-added-alert');
    addToCart.classList.add('btn-disable');
  }
};

export default HideproductaddedAlert;
