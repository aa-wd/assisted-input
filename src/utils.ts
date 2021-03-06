export const moveArrayIndex = (forwards: boolean, index: number, length: number) => {
  if (forwards) return index + 1 < length ? index + 1 : 0;
  return index - 1 < 0 ? length -1 : index - 1;
};

export const getBasePixelSize = () => parseFloat(getComputedStyle(document.body).fontSize!.split('px')[0]);
