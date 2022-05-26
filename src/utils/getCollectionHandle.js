import axios from 'axios';
export const getCollectionHandle = (
  setProductData,
  id,
  setload,
  setRawProductData,
  setOnError,
) => {
  axios({
    method: 'post',
    url: `${window.location.origin}/_hcms/api/getcollectionbyhandle`,
    data: { collectionHandle: id },
  })
    .then(response => {
      setProductData(response?.data?.data?.collectionByHandle?.products?.edges);
      setRawProductData(
        response?.data?.data?.collectionByHandle?.products?.edges,
      );
      if (response?.data?.data?.collectionByHandle) {
        setload(true);
        setOnError(false);
      } else {
        setOnError(true);
      }
    })
    .catch(er => {
      setOnError(true);
      console.log(er);
    });
};
