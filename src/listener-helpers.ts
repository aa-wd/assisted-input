import { AssistedInputTarget, AssistedInputElement, InputState, DiacriticsObject } from './types';
import { getEmptyInputState } from './models';
import { moveArrayIndex } from './utils';

export const getCurrentInputIndex = (e: AssistedInputTarget) => e.target.dataset.assistedinputid;

export const getInputElement = (inputIndex: number|string) => {
  return document.querySelector(`[data-assistedinputid="${inputIndex}"]`)
};

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
    }, 200);
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

const changeInputValue = (inputIndex: string, newCharacter: string, replaceChar = true) => {
  const input = getInputElement(inputIndex) as HTMLInputElement;

  const { value, selectionStart } = input;
  const currentCaretPosition = replaceChar ? input.selectionStart : input.selectionStart! + 1;
  const endOffset = replaceChar ? 1 : 0;

  const stringBeforeCaret = value.substring(0, selectionStart! - endOffset);
  const stringAfterCaret = value.substring(selectionStart!, input.value.length);
  const newValue = `${stringBeforeCaret}${newCharacter}${stringAfterCaret}`;
  input.value = newValue;

  /**
   * Fix caret position in input when changing text. Caret jumps to end if
   * text is changed.
   */
  input.setSelectionRange(currentCaretPosition!, currentCaretPosition!);
};

export const selectNextDiacritic = (
  forwards: boolean, diacritics: string[], inputState: InputState, inputIndex: string,
) => {
  const nextIndex = moveArrayIndex(forwards, inputState.diacriticIndex, diacritics.length);
  highlightNext(nextIndex, inputState.diacriticBase!);
  inputState.diacriticIndex = nextIndex;

  const currentDiacritic = diacritics[inputState.diacriticIndex];
  changeInputValue(inputIndex, currentDiacritic);
};

export const handleKeyDownWithDiacritics = (e: AssistedInputTarget) => {
  e.preventDefault();

  const inputIndex = getCurrentInputIndex(e);
  const inputState = getInputState(e);
  const diacritics = window.AssistedInputFields.diacritics![inputState.diacriticBase as string];

  switch(e.key) {
    case ' ':
    case 'Enter': {
      resetInputState(inputIndex);
      break;
    }
    case 'ArrowRight':
    case inputState.diacriticBase: {
      selectNextDiacritic(true, diacritics, inputState, inputIndex);
      break;
    }
    case 'ArrowLeft': {
      selectNextDiacritic(false, diacritics, inputState, inputIndex);
      break;
    }
    case 'Escape':
    case 'Backspace': {
      // On escape and backspace, revert to original character without diacritic.
      const originalChar = inputState.diacriticBase!;
      changeInputValue(inputIndex, originalChar);
      resetInputState(inputIndex);
      break;
    }
    default: {
      if (e.key.length === 1) {
        changeInputValue(inputIndex, e.key, false);
        resetInputState(inputIndex);
      }
    }
  }
};

export const checkLongSpacebarPress = (e: AssistedInputTarget) => {
  const inputState = getInputState(e);
  const inputIndex = getCurrentInputIndex(e);

  if (e.key === ' ' && !inputState.lastKeyWasApostrophe) {
    changeInputValue(inputIndex, "'")
    inputState.lastKeyWasApostrophe = true;
  }
}
