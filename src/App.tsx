import { ChangeEvent, FormEvent, MouseEvent, useEffect } from 'react';
import { useState } from 'react';
import { isEqual } from 'lodash';
import Form from './Form/Form';
import Table from './Table/Table';
import { IFromState, Link, IToState } from './types/state.interface';

const blocksData = {
  block_1: {
    inputs: {
      subInputBlock_1: {
        input_1: {id: 'input_1'},
        input_2: {id: 'input_2'},
        input_3: {id: 'input_3'},
      },
      subInputBlock_2: {
        input_2: {id: 'input_2'},
        input_3: {id: 'input_3'},
        input_4: {id: 'input_4'},
      },
    },
    outputs: {
      subOutputBlock_1: {
        output_1: {id: 'output_1'},
        output_2: {id: 'output_2'},
        output_3: {id: 'output_3'},
      },
      subOutputBlock_2: {
        output_2: {id: 'output_2'},
        output_3: {id: 'output_3'},
        output_4: {id: 'output_4'},
      },
    },
  },
  block_2: {
    inputs: {
      subInputBlock_2: {
        input_1: {id: 'input_1'},
        input_2: {id: 'input_2'},
        input_3: {id: 'input_3'},
      },
      subInputBlock_3: {
        input_2: {id: 'input_2'},
        input_3: {id: 'input_3'},
        input_4: {id: 'input_4'},
      },
    },
    outputs: {
      subOutputBlock_3: {
        output_1: {id: 'output_1'},
        output_2: {id: 'output_2'},
        output_3: {id: 'output_3'},
      },
      subOutputBlock_2: {
        output_2: {id: 'output_2'},
        output_3: {id: 'output_3'},
        output_4: {id: 'output_4'},
      },
    },
  },
};

const App = ():JSX.Element => {

  const [fromState, setFromState] = useState<IFromState>({
    fromBlockId: '',
    fromSubBlockId: '',
    fromInputId: '',
  });

  const [toState, setToState] = useState<IToState>({
    toBlockId: '',
    toSubBlockId: '',
    toOutputId: '',
  });

  const [links, setLinks] = useState<Link[]>([]);

  const [isValid, setIsValid] = useState<boolean>(false);

  const clearLinks = links.map(link => {
    const {id, ...clearLink} = link;
    return clearLink;
  });

  useEffect(() => {
    if (fromState.fromBlockId && fromState.fromSubBlockId && fromState.fromInputId &&
      toState.toBlockId && toState.toSubBlockId && toState.toOutputId) {
        setIsValid(!clearLinks.some(link => isEqual(link, {...fromState, ...toState})));
    } else {
      setIsValid(false)
    }
  }, [fromState, toState, clearLinks]);

  const changeFromHandler = (event: ChangeEvent<HTMLSelectElement>, type: string):void => {
    switch(type) {
      case 'fromBlock':
        setFromState({
          fromBlockId: event.target.value,
          fromSubBlockId: '',
          fromInputId: '',
        });
        break;
      case 'fromSubBlock':
        setFromState(prevState => ({
          ...prevState,
          fromSubBlockId: event.target.value,
          fromInputId: '',
        }));
        break;
      case 'fromInput':
        setFromState(prevState => ({
          ...prevState,
          fromInputId: event.target.value,
        }));
    }
  };

  const changeToHandler = (event: ChangeEvent<HTMLSelectElement>, type: string):void => {
    switch(type) {
      case 'toBlock':
        setToState({
          toBlockId: event.target.value,
          toSubBlockId: '',
          toOutputId: '',
        });
        break;
      case 'toSubBlock':
        setToState(prevState => ({
          ...prevState,
          toSubBlockId: event.target.value,
          toOutputId: '',
        }));
        break;
      case 'toOutput':
        setToState(prevState => ({
          ...prevState,
          toOutputId: event.target.value,
        }));
    }
  };

  const addLink = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = String(Math.floor(Math.random() * 100) + 1);

    setLinks(prevState => [
      ...prevState,
      {id, ...fromState, ...toState} as Link,
    ]);

    setFromState({
      fromBlockId: '',
      fromSubBlockId: '',
      fromInputId: '',
    });

    setToState({
      toBlockId: '',
      toSubBlockId: '',
      toOutputId: '',
    });
  };

  const removeLink = (event: MouseEvent<HTMLButtonElement>):void => {
    const filteredLinks = links.filter(link => link.id !== event.currentTarget.id)
    setLinks(filteredLinks);
  };

  return (
    <>
      <Form data={blocksData} from={fromState} to={toState} isValid={isValid} setFrom={changeFromHandler} setTo={changeToHandler} addLink={addLink} />
      <Table links={links} from={fromState} to={toState} removeLink={removeLink} />
    </>
  );
}

export default App;
