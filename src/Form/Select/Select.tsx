import SelectProps from './select.props';

const Select = ({options, ...props}: SelectProps):JSX.Element => {
  console.log()
  return (
    <select {...props}>
      <option value=''>Выберите блок</option>
      {
        options.map(o => (
          <option key={o} value={o}>{o}</option>
        ))
      }
    </select>
  );
};

export default Select;