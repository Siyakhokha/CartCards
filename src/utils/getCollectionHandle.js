import axios from 'axios';
export const getCollectionHandle = (setProductData, id, setload, load) => {
  axios({
    method: 'post',
    url: `${window.location.origin}/_hcms/api/getcollectionbyhandle`,
    data: { collectionHandle: id },
  })
    .then(response => {
      setProductData(response?.data?.data?.collectionByHandle?.products?.edges);
      if (response?.data?.data) {
        console.log(response?.data?.data?.collectionByHandle?.products?.edges);
        console.log('load:', load);
        setload(false);
      }
    })
    .catch(er => {
      console.log('error', er);
    });
};
