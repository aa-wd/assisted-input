export interface InputState {
  activeKey: string;
  diacriticBase: null | string;
  diacriticIndex: number;
  showDiacritics: boolean;
  pressCount: number;
  lastKeyWasApostrophe: boolean;
  inputIndex: null | number;
}

export interface DiacriticsObject {
  [key: string]: string[];
};

export interface AssistedInput {
  dataset: {
    assistedinputid: string;
  }
}

export type AssistedInputElement = HTMLInputElement & AssistedInput;

export interface EventTargetInput {
  target: AssistedInputElement;
}

export type AssistedInputTarget = KeyboardEvent & EventTargetInput;

export type AssistedInputTargetFunction = (e: AssistedInputTarget) => void;

export type EventNamesAndFunctions = [string, AssistedInputTargetFunction][];
