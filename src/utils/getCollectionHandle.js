import axios from 'axios';
export const getCollectionHandle = (setProductData, id, setloading) => {
  axios({
    method: 'post',
    url: `${window.location.origin}/_hcms/api/getcollectionbyhandle`,
    data: { collectionHandle: id },
  })
    .then(response => {
      setProductData(response?.data?.data?.collectionByHandle?.products?.edges);
      if (response?.data?.data?.collectionByHandle?.products?.edges) {
        setloading(true);
      }
    })
    .catch(er => {
      console.log('error', er);
    });
};
