export interface InputState {
  activeKey: string;
  diacriticBase: null | string;
  diacriticIndex: number;
  showDiacritics: boolean;
  pressCount: number;
}

export interface DiacriticsObject {
  [key: string]: string[];
};

export interface AssistedInput {
  dataset: {
    assistedinputid: string;
  }
}

export interface EventTargetInput {
  target: AssistedInput;
}
