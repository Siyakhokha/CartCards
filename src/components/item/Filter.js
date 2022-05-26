import React from 'react';
import productIdCleaner from '../../utils/productIdCleaner';
import productTitleCleaner from '../../utils/productTitleCleaner';

const Filter = ({ id, ProductData, NewproductData }) => {
  const filterProduct = e => {
    let string1 = 'All';
    let string2 = e.target.value;

    if (string2.toLowerCase() === string1.toLowerCase()) {
      let items = document?.querySelectorAll(
        '.spinning-logo__container .item.accessories',
      );

      items?.forEach(i => {
        i?.classList.remove('HideItem');
      });
    } else {
      const filtered = ProductData.filter(p => {
        return productTitleCleaner(p.node.title)
          .toLocaleLowerCase()
          .includes(productTitleCleaner(string2).toLocaleLowerCase());
      });
      let items = document?.querySelectorAll(
        '.spinning-logo__container .item.accessories',
      );

      items?.forEach(i => {
        i?.classList.add('HideItem');
      });
      let ProductaddedAlert = document.querySelector(
        `#${productIdCleaner(filtered[0]?.node?.handle)}`,
      );
      ProductaddedAlert?.classList.remove('HideItem');
    }
  };

  let ProductName = NewproductData.map(i => {
    return { ProductName: i?.node?.title, ProductURL: i?.node?.onlineStoreUrl };
  });

  ProductName.unshift({
    ProductName: 'All',
    ProductURL: window.location.href,
  });

  return (
    <>
      {id == 'accessories' && ProductName && ProductName.length > 0 && (
        <div className="Filter">
          <p>Filter by</p>
          <select
            onChange={event => {
              filterProduct(event);
            }}
          >
            {ProductName.map(Product => {
              return (
                Product?.ProductURL && (
                  <option value={Product?.ProductName}>
                    {productTitleCleaner(Product?.ProductName)}
                  </option>
                )
              );
            })}
          </select>
        </div>
      )}
    </>
  );
};

export default Filter;
