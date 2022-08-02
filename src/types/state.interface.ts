export interface IFromState {
  fromBlockId: string;
  fromSubBlockId: string;
  fromInputId: string;
}

export interface IToState {
  toBlockId: string;
  toSubBlockId: string;
  toOutputId: string;
}

export interface Link extends IFromState, IToState {
  id: string;
}