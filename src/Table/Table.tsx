import TableProps from './table.props';
import styles from './Table.module.css';
import { IFromState, IToState } from '../types/state.interface';

const Table = ({links, from, to, removeLink}: TableProps): JSX.Element => {
  
  const filteredLinks = links.filter(link => {

    let fkey: keyof IFromState;
    let tkey: keyof IToState;

    for (fkey in from) {
      if (from[fkey] !== link[fkey] && from[fkey]) {
        return false;
      }
    }

    for (tkey in to) {
      if (to[tkey] !== link[tkey] && to[tkey]) {
        return false;
      }
    }

    return true;
  })

  return (
    <div className={styles.table}>
      <h2 className={styles.title}>Links</h2>
      {
        filteredLinks.map(link => (
            <div key={link.id} className={styles.link}>
              <div>{link.id}</div>
              <div>{link.fromBlockId}</div>
              <div className={styles.subBlock}>{`[${link.fromSubBlockId}]`}</div>
              <div className={styles.io}>{link.fromInputId}</div>
              <img className='arrow' src='/arrow.png' alt='arrow' />
              <div>{link.toBlockId}</div>
              <div className={styles.subBlock}>{`[${link.toSubBlockId}]`}</div>
              <div className={styles.io}>{link.toOutputId}</div>
              <button id={link.id} onClick={removeLink}>
                <img className={styles.deleteIcon} src='/delete.png' alt='delete' />
              </button>
            </div>
          ))
      }
    </div>
  );
};

export default Table;