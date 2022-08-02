import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';

interface SelectProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  options: string[];
}

export default SelectProps;