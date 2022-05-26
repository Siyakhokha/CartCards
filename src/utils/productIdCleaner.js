export default function productIdCleaner(ID) {
  let newID = ID?.replace('8-', '');

  return newID;
}
