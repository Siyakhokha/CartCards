export default function productIdFilter(productIdFilter) {
  let newID = productIdFilter
    .replaceAll('-', ' ')
    .replace('copy of', ' ')
    .replace('ikhokha', ' ');
  return newID;
}
