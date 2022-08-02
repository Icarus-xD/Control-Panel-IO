import { MouseEvent } from 'react';
import { IFromState, IToState, Link } from '../types/state.interface';

interface TableProps {
  links: Link[];
  from: IFromState;
  to: IToState;
  removeLink: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default TableProps;