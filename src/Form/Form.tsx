import FormProps from './form.props';
import Select from './Select/Select';
import styles from './Form.module.css';

const Form = ({data, from, to, isValid, setFrom, setTo, addLink}: FormProps):JSX.Element => {

  const inputBlocks = Object.keys(data);
  const subInputBlocks = from.fromBlockId ? Object.keys(data[from.fromBlockId].inputs) : [];
  const inputs = from.fromSubBlockId ? Object.keys(data[from.fromBlockId].inputs[from.fromSubBlockId]): [];

  const outputBlocks = Object.keys(data);
  const subOutputBlocks = to.toBlockId ? Object.keys(data[to.toBlockId].outputs) : [];
  const outputs = to.toSubBlockId ? Object.keys(data[to.toBlockId].outputs[to.toSubBlockId]): [];

  return (
    <form className={styles.form} onSubmit={addLink}>
      <Select options={inputBlocks} value={from.fromBlockId} onChange={(e) => setFrom(e, 'fromBlock')} required />
      <Select options={subInputBlocks} value={from.fromSubBlockId} onChange={(e) => setFrom(e, 'fromSubBlock')} disabled={!from.fromBlockId} required />
      <Select options={inputs} value={from.fromInputId} onChange={(e) => setFrom(e, 'fromInput')} disabled={!from.fromSubBlockId} required />
      <img className='arrow' src='/arrow.png' alt='arrow' />
      <Select options={outputBlocks} value={to.toBlockId} onChange={(e) => setTo(e, 'toBlock')} required />
      <Select options={subOutputBlocks} value={to.toSubBlockId} onChange={(e) => setTo(e, 'toSubBlock')} disabled={!to.toBlockId} required />
      <Select options={outputs} value={to.toOutputId} onChange={(e) => setTo(e, 'toOutput')} disabled={!to.toSubBlockId} required />
      <button className={styles.button} disabled={!isValid}>Добавить ссылку</button>
    </form>
  );
};

export default Form;