import {
  keyIsActive, handleKeyDownWithDiacritics, checkForSpecialCharacter, getInputState,
  resetInputState,
} from './listener-helpers';
import { AssistedInputTarget } from './types';

export const handleKeyDown = (e: AssistedInputTarget) => {
  const inputState = getInputState(e);

  if (keyIsActive(e, inputState)) {
    return;
  }

  if (inputState.showDiacritics) {
    handleKeyDownWithDiacritics(e);
    return;
  }

  checkForSpecialCharacter(e.key, inputState, inputState.pressCount + 1, e.target);

  inputState.activeKey = e.key;
  inputState.pressCount += 1;
};

export const handleKeyUp = (e: AssistedInputTarget) => {
  const inputState = getInputState(e);
  /**
   * if two different keys are pressed very rapidly after each other,
   * the first key up event will fire after the *second* keydown. Prevent
   * removing the active key in such a situation.
   */
  if (e.key === inputState.activeKey) {
    inputState.activeKey = '';
    inputState.lastKeyWasApostrophe = false;
  }
};

export const handleBlur = (e: AssistedInputTarget) => {
  const index = e.target.dataset.assistedinputid;
  resetInputState(index);
};
