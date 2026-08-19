export default function canNext(currentIndex, totalSteps) {
  return Number.isInteger(currentIndex)
    && Number.isInteger(totalSteps)
    && currentIndex < totalSteps - 1;
}
