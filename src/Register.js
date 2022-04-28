import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PopulateStorage, checkPCNameIsUnique } from './Storage';
import Button from './components/Button';
import InputGroup from './components/InputGroup';


const Register = () => {
  const [pCName, setPCName] = useState('');
  const [pCNameIsUnique, setUniqueness] = useState(true);
  const [pCSTR, setPCSTR] = useState(0);
  const [valideSTR, setValideSTR] = useState(true);

  let goto = useNavigate();

  const CreateNPC = () => {
    if (pCNameIsUnique && valideSTR) {
      PopulateStorage(pCName, pCSTR);
      setUniqueness(false);
      goto(`/u/${pCName}`);
    }
  }

  return (
    <div>
      <h1 className='aurebesh-droid'>Create character</h1>
      <h2 className='default'>Create character</h2>
      <div style={{ height: '4.8rem' }}></div>
      <InputGroup
        id="pc-name"
        label="Character name"
        placeholder='Not Obi-Wan'
        style={{ width: '100%' }}
        className={pCNameIsUnique ? '' : 'input-error'}
        textError={pCNameIsUnique ? '' : 'Character name already exist'}
        onChange={
          (e) => {
            console.log(e.target.value)
            if (checkPCNameIsUnique(e.target.value)) {
              setUniqueness(true);
              setPCName(e.target.value);
            } else {
              setUniqueness(false);
            }
          }
        }
        />
      <InputGroup
        id="pc-str"
        label="STR"
        type='number'
        placeholder='0'
        style={{ width: '9.6rem' }}
        className={valideSTR ? '' : 'input-error'}
        textError={valideSTR ? '' : 'STR should be between 0 and 30'}
        onChange={
          (e) => {
            if (!isNaN(e.target.value)) {
              let str = parseInt(e.target.value);
              if ( str >= 0 && str <= 30) {
                setPCSTR(str);
                setValideSTR(true);
              } else {
                setValideSTR(false);
              }
            } else {
              setValideSTR(false);
            }
          }
        }
      />
      <Button onClick={() => CreateNPC()} >
        Start playing
      </Button>
    </div>
  );
}

export default Register;