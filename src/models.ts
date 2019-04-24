export const getEmptyInputState = (inputIndex: number) => ({
  activeKey: '',
  diacriticBase: null,
  diacriticIndex: 0,
  showDiacritics: false,
  pressCount: 0,
  lastKeyWasApostrophe: false,
  inputIndex,
});
