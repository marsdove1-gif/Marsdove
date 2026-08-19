export default function canPrev(currentIndex) {
  return Number.isInteger(currentIndex) && currentIndex > 0;
}
