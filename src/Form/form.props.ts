import { ChangeEvent, FormEvent } from 'react';
import { IFromState, IToState } from '../types/state.interface';

interface FormProps {
  data: any;
  from: IFromState;
  to: IToState;
  isValid: boolean;
  setFrom: (event: ChangeEvent<HTMLSelectElement>, type: string) => void;
  setTo: (event: ChangeEvent<HTMLSelectElement>, type: string) => void;
  addLink: (event: FormEvent<HTMLFormElement>) => void;
}

export default FormProps;