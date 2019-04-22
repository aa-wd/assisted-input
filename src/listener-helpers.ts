import { AssistedInputTarget, AssistedInputElement, InputState } from './types';
import { getEmptyInputState } from './models';
import { moveArrayIndex } from './utils';

export const getCurrentInputIndex = (e: AssistedInputTarget) => e.target.dataset.assistedinputid;

export const getInputState = (e: AssistedInputTarget) => {
  const currentInputIndex = getCurrentInputIndex(e);
  return window.AssistedInputFields.inputStates[currentInputIndex];
};

const getDiacriticBoxSelector = (diacriticBase: string) => `.diacritic-box[data-diacriticbase=${diacriticBase}]`;

export const keyIsActive = (e: AssistedInputTarget, inputState: InputState) => {
  const isRepeatable = ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'];

  if (isRepeatable.includes(e.key)) return false;

  if (e.key === inputState.activeKey) {
    e.preventDefault();
    return true;
  };
};

export const checkForSpecialCharacter = (
  key: string, inputState: InputState, currentPressCount: number, input: AssistedInputElement
) => {
  const { specialChars } = window.AssistedInputFields;

  if (specialChars!.includes(key)) {

    setTimeout(() => {
      if (key === inputState.activeKey && currentPressCount === inputState.pressCount) {
        showDiacriticBox(key, input);
      }
    }, 250);
  }
};

const showDiacriticBox = (diacriticBase: string, input: AssistedInputElement) => {
  const diacriticBox = document.querySelector(getDiacriticBoxSelector(diacriticBase)) as HTMLDivElement;
  const assistedInputId = input.dataset.assistedinputid;
  const inputState = window.AssistedInputFields.inputStates[assistedInputId];
  const { left, top, height } = input.getBoundingClientRect();

  diacriticBox.style.display = 'flex';
  diacriticBox.style.left = `${left + 5}px`;
  diacriticBox.style.top = `${top - 0.5 * height}px`;

  inputState.diacriticBase = diacriticBase;
  inputState.showDiacritics = true;
};

export const resetInputState = (index: string) => {
  const inputState = window.AssistedInputFields.inputStates[index];

  if (inputState.diacriticBase) {
    const diacriticBox = document.querySelector(getDiacriticBoxSelector(inputState.diacriticBase)) as AssistedInputElement;
    if (diacriticBox) {
      diacriticBox.style.display = 'none';
    }

    if (inputState.diacriticIndex) {
      highlightNext(0, inputState.diacriticBase);
    }
  }
  window.AssistedInputFields.inputStates[index] = getEmptyInputState();
};

const highlightNext = (newActiveIndex: number, diacriticBase: string) => {
  const activeSelector = `.diacritic-box__character--active[data-diacriticbase=${diacriticBase}]`;
  const activeClassName = 'diacritic-box__character--active';
  const oldElement = document.querySelector(activeSelector);

  if (oldElement) {
    oldElement.classList.remove(activeClassName);
  }
  const nextSelector = `[data-diacriticbase="${diacriticBase}"][data-diacriticindex="${newActiveIndex}"]`;
  const nextElement = document.querySelector(nextSelector);

  nextElement!.classList.add(activeClassName);
};

export const handleKeyDownWithDiacritics = (e: AssistedInputTarget) => {
  e.preventDefault();

  const inputIndex = getCurrentInputIndex(e);
  const inputState = getInputState(e);

  const diacritics = window.AssistedInputFields.diacritics![inputState.diacriticBase as string];

  switch(e.key) {
    case 'Enter':
    case 'Backspace':
    case 'Escape': {
      resetInputState(inputIndex);
      break;
    }
    case 'ArrowRight':
    case inputState.diacriticBase: {
      const nextIndex = moveArrayIndex(true, inputState.diacriticIndex, diacritics.length);
      highlightNext(nextIndex, inputState.diacriticBase!);
      inputState.diacriticIndex = nextIndex;
      break;
    }
    case 'ArrowLeft': {
      const nextIndex = moveArrayIndex(false, inputState.diacriticIndex, diacritics.length);
      highlightNext(nextIndex, inputState.diacriticBase!);
      inputState.diacriticIndex = nextIndex;
      break;
    }
  }
};

