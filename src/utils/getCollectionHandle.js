import axios from 'axios';
export const getCollectionHandle = (setProductData, id) => {
  axios({
    method: 'post',
    url: `${window.location.origin}/_hcms/api/getcollectionbyhandle`,
    data: { collectionHandle: id },
  })
    .then(response => {
      setProductData(response?.data?.data?.collectionByHandle?.products?.edges);
    })
    .catch(er => {
      console.log('error', er);
    });
};
