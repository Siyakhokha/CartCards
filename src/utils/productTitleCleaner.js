export default function productTitleCleaner(title) {
  let newTitle = title
    .replace('iKhokha', ' ')
    .replace('Card Machine', ' ')
    .replace('(SIM Included)', ' ')
    .replace('(box of 10)', ' ')
    .replace('Handheld', ' ')
    .replace('including Bluetooth Adapter', ' ')
<<<<<<< Updated upstream
    .replace('Bluetooth', ' ')
=======
    .replace('Bluetooth ', ' ')
>>>>>>> Stashed changes
    .replace('Adapter', ' ')
    .replace('including', ' ');

  return newTitle;
}
