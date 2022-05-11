export default function productTitleCleaner(title) {
  let newTitle = title
    .replace('iKhokha', ' ')
    .replace('Card Machine', ' ')
    .replace('(SIM Included)', ' ')
    .replace('(box of 10)', ' ')
    .replace('Handheld', ' ')
    .replace('including Bluetooth Adapter', ' ')
    .replace('Bluetooth ', ' ');

  return newTitle;
}
