export default function productIdCleaner(ID) {
  let newID = ID?.replace('8-', '');
  return newID;
}
export const ProductIdDecoded = id => {
  let NewId = Buffer.from(id, 'base64');
  let CleanId = NewId.toString().replace('gid://shopify/Product/', '');
  return parseInt(CleanId);
};
