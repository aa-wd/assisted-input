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

export const handleKeyPress = (e: AssistedInputTarget) => {
  const inputState = getInputState(e);
};

export const handleKeyUp = (e: AssistedInputTarget) => {
  const inputState = getInputState(e);

  inputState.activeKey = '';
};

export const handleBlur = (e: AssistedInputTarget) => {
  const index = e.target.dataset.assistedinputid;
  resetInputState(index);
};
