import React, { useState, useEffect } from 'react';
import { 
  Link,
  Outlet,
  useLocation,
} from 'react-router-dom';
import styled from 'styled-components';

import Container from './components/Container';
import DamageRanger from './components/DamageRanger';
import HealthChunk  from './components/HealthChunk';
import { GhostButton } from './components/Button';
import { getPC, updatePC } from './Storage';

const Flex = styled.div`
  display: flex;
  flex-direction: col;
  justify-content: space-between;

  & + & {
    margin-left: 1.6rem;
  }
`;

const Button = styled.button`
  background: transparent;
  border: .2rem solid var(--blue);
  border-radius: .6rem;
  color: var(--blue);

  &:disabled {
    opacity: .3;
    
    &:hover { cursor: not-allowed; }
  }

  &:hover {
    color: var(--yellow);
    border-color: var(--yellow);
  }
`;

const DamageIndicator = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;

  height: 2.4rem;
  width: 4rem;
  padding: 0 .3rem;

  background: linear-gradient(to left, #980605 0%, #800 5%, #980605 10%, #800 15%, #980605 20%, #800 25%, #980605  30%, #800 35%, #980605 40%, #800 45%, #980605 50%, #800 55%, #980605 60%, #800 65%, #980605 70%, #800  75%, #980605 80%, #800 85%, #980605 90%, #800 95%, #980605 100%);
  & > h3 { color: red; }
`;

//* TODO
//? 1
//  Change saving data method 
//    `-> 1st : send to localStorgae
//    `-> then : update states of arrow function
//? 2
//  Add a 'back to menu' button
//  (state === localStorage) ? goto : update and then goto

const Dashboard = () => {
  const [pcID, setPCID] = useState(-1);
  const [name, setName] = useState('');
  const [maxStun, setMaxStun] = useState(4);
  const [stunChunkConsumed, setStunChunkConsumed] = useState(0);
  const [woundChunkConsumed, setWoundChunkConsumed] = useState(0);
  const [incapacitatedChunkConsumed, setIncapacitatedChunkConsumed] = useState(0);
  const [mortallyWoundedChunkConsumed, setMortallyWoundedChunkConsumed] = useState(0);
  const [currentStatus, setCurrentStatus] = useState('Everything alright');
  const [damageTaken, setDamageTaken] = useState(0);
  const [preventDoubleTape, setPreventDoubleTape] = useState(true);
  const [prone, setProne] = useState(false);
  const [statusLevel, setStatusLevel] = useState(0);

  let loc = useLocation();
  let res = getPC(loc.search.substring(loc.search.lastIndexOf('?') + 1));
  console.log(res);

  useEffect(() => {
    setPCID(res.id);
    setName(res.name);
    setMaxStun(res.str);
    setStunChunkConsumed(res.stun);
    setWoundChunkConsumed(res.wound);
    setIncapacitatedChunkConsumed(res.incapacited);
    setMortallyWoundedChunkConsumed(res.mortally);
    setProne(res.prone);
    setStatusLevel(res.statuslvl);
  }, [res]);

  const removeOneStunned = () => {
    if (stunChunkConsumed > 0 && statusLevel === 0) {
      let tmpStunChunk = stunChunkConsumed - 1;
      setStunChunkConsumed(tmpStunChunk)
      setStatusLevel(tmpStunChunk === 0 ? statusLevel - 1 : statusLevel)
    }
  }

  const removeOneWounded = () => {
    if (woundChunkConsumed > 0 && statusLevel === 1) {
      let tmpWoundChunk = woundChunkConsumed - 1;
      setWoundChunkConsumed(tmpWoundChunk)
      setStatusLevel(tmpWoundChunk === 0 ? statusLevel - 1 : statusLevel);
      if (statusLevel - 1 === 0)
        setCurrentStatus('Everything alright')
    }
  }

  const removeOneIncapacitated = () => {
    if (incapacitatedChunkConsumed > 0 && statusLevel === 2) {
      let tmpIncapacitatedChunk = incapacitatedChunkConsumed - 1;
      setIncapacitatedChunkConsumed(tmpIncapacitatedChunk);
      setStatusLevel(tmpIncapacitatedChunk === 0 ? statusLevel - 1 : statusLevel);
    }
  }
  
  const removeOneMortallyWounded = () => {
    if (mortallyWoundedChunkConsumed > 0 && statusLevel === 3) {
      let tmpMortallyWoundedChunk = mortallyWoundedChunkConsumed - 1;
      setMortallyWoundedChunkConsumed(tmpMortallyWoundedChunk);
      setStatusLevel(tmpMortallyWoundedChunk === 0 ? statusLevel - 1 : statusLevel);
    }
  }

  const resetAll = () => {
    if (window.confirm('Are you sure you want to reset your health status? (previous state cannot be retrieved yet)' )) {
      setStunChunkConsumed(0);
      setWoundChunkConsumed(0);
      setIncapacitatedChunkConsumed(0);
      setMortallyWoundedChunkConsumed(0);
      setProne(false);
      setStatusLevel(0);
    } 
  }

  const handleChange = (ev) => {
    setDamageTaken(ev.target.valueAsNumber);
    setPreventDoubleTape(false);
  }

  const takeDamage = () => {
    if (preventDoubleTape) {
      return;
    }

    // STUNNED
    if (damageTaken < 4) {
      if (stunChunkConsumed + 1 === maxStun && woundChunkConsumed < 3) {
          const woundChunkDamage = woundChunkConsumed + 1;
          setProne(true);
          setStatusLevel(1);
          setCurrentStatus('You\'re prone');
          setStunChunkConsumed(stunChunkConsumed + 1)
          setWoundChunkConsumed(woundChunkDamage)
      } else if (stunChunkConsumed < maxStun) {
        setStunChunkConsumed(stunChunkConsumed + 1);
      }

    // WOUNDED
    } else if (damageTaken < 9) {
      if (woundChunkConsumed + 1 === 3 && incapacitatedChunkConsumed < 2) {
          const incapacitatedChunkDamage = incapacitatedChunkConsumed + 1;
          const woundChunkDamage = woundChunkConsumed + 1;
          setProne(true);
          setStatusLevel(2);
          setCurrentStatus('You\'re prone');
          setStunChunkConsumed(maxStun);
          setWoundChunkConsumed(woundChunkDamage);
          setIncapacitatedChunkConsumed(incapacitatedChunkDamage);
      } else if (woundChunkConsumed < 3) {
        const woundChunkDamage = woundChunkConsumed + 1;
        setProne(true);
        setStatusLevel(1);
        setCurrentStatus('You\'re prone');
        setStunChunkConsumed(maxStun);
        setWoundChunkConsumed(woundChunkDamage);
      }

    // INCAPACITATED
    } else if (damageTaken < 13) {
      if (incapacitatedChunkConsumed + 1 === 2 && mortallyWoundedChunkConsumed < 2) {
          const mortallyWoundedChunkDamage = mortallyWoundedChunkConsumed + 1;
          setProne(true);
          setStatusLevel(3);
          setCurrentStatus('You\'re prone');
          setStunChunkConsumed(maxStun);
          setWoundChunkConsumed(3);
          setIncapacitatedChunkConsumed(2);
          setMortallyWoundedChunkConsumed(mortallyWoundedChunkDamage);
      } else if (incapacitatedChunkConsumed< 2) {
        const incapacitatedChunkDamage = incapacitatedChunkConsumed + 1;
        setProne(true);
        setStatusLevel(2);
        setCurrentStatus('You\'re prone');
        setStunChunkConsumed(maxStun);
        setWoundChunkConsumed(3);
        setIncapacitatedChunkConsumed(incapacitatedChunkDamage);
      }

    // MORTALLY WOUNDED
    } else if (damageTaken < 16) {
      if (mortallyWoundedChunkConsumed + 1 === 2) {
        setProne(true);
        setStatusLevel(4);
        setCurrentStatus('You die');
        setStunChunkConsumed(maxStun);
        setWoundChunkConsumed(3);
        setIncapacitatedChunkConsumed(2);
        setMortallyWoundedChunkConsumed(2);
      } else if (mortallyWoundedChunkConsumed < 2) {
        const mortallyWoundedChunkDamage = mortallyWoundedChunkConsumed + 1;
        setProne(true);
        setStatusLevel(3);
        setCurrentStatus('You\'re prone');
        setStunChunkConsumed(maxStun);
        setWoundChunkConsumed(3);
        setIncapacitatedChunkConsumed(2);
        setMortallyWoundedChunkConsumed(mortallyWoundedChunkDamage);
      }
      
    // SUPER DEAD
    } else {
      setStunChunkConsumed(maxStun);
      setStatusLevel(4);
      setCurrentStatus('You die');
      setWoundChunkConsumed(3);
      setIncapacitatedChunkConsumed(2);
      setMortallyWoundedChunkConsumed(2);
    }
    setDamageTaken(0);
    setPreventDoubleTape(true);
    const tmpData = [
      {key: 'stun', value: stunChunkConsumed},
      {key: 'wound', value: woundChunkConsumed},
      {key: 'incapacited', value: incapacitatedChunkConsumed},
      {key: 'mortally', value: mortallyWoundedChunkConsumed},
      {key: 'prone', value: prone},
      {key: 'statuslvl', value: statusLevel},
    ];
    console.log('tmpData:[',pcID,']', tmpData);
    updatePC(
      pcID, 
      tmpData
    );
    console.log(getPC(loc.search.substring(loc.search.lastIndexOf('?') + 1)));

  }

  let statusInformation  = [
    [
      'cannot take action until next round',
      `-${woundChunkConsumed}D to skill and attribute rolls until healed`
    ],
    [
      'knocked unconscious for 10D minutes',
      'cannot do anything until healed'
    ],
    [
      'cannot do anything until healed',
      'at the end of each round roll 2D. If the result < number of round. Being mortally wounded Character dies'
    ],
    [
      'RIP',
      'You\'ll be remembered'
    ]
  ];

  return (
    <div className='centered-container'>
      <div>
        <Outlet />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1>
            <Link to={`/pc`}>◁</Link>
          </h1>
          <div>
            <h1 className="username aurebesh-droid">
              {name}
            </h1>
            <h4 className='username'>{name}</h4>
          </div>
        </div>
        <Container id={'health-status-container'}>
          <Flex>
            <div>
              <h6 className="aurebesh-droid">
                Health
              </h6>
              <h5>
                Health Status
              </h5>
            </div>
            <Button 
              onClick={() => resetAll()}
              disabled={statusLevel === 0 ? true : false}  
            >
              Reset
            </Button>
          </Flex>
          <br/>
          <HealthChunk 
            chunkType={'stunned'}
            chunkNumber={maxStun} 
            chunkConsumed={stunChunkConsumed}
            onClick={() => removeOneStunned()}
          />
          <HealthChunk 
            chunkType={'wounded'}
            chunkNumber={3} 
            chunkConsumed={woundChunkConsumed}
            onClick={() => removeOneWounded()}
          />
          <HealthChunk 
            chunkType={'incapacitated'}
            chunkNumber={2} 
            chunkConsumed={incapacitatedChunkConsumed}
            onClick={() => removeOneIncapacitated()}
          />
          <HealthChunk 
            chunkType={'mortally wounded'}
            chunkNumber={2} 
            chunkConsumed={mortallyWoundedChunkConsumed}
            onClick={() => removeOneMortallyWounded()}
          />
        </Container>
        <Container id={'damage-progress'}>
          <DamageRanger 
            damage={damageTaken}
          />
          <input 
            onChange={(e) => handleChange(e)} 
            style={{
              position: 'absolute',
              top: 0,
              height: '100%',
              width: 'calc(100% - 4rem)',
              opacity: 0
            }}
            type={'range'}
            min={'1'}
            max={'16'}
            step={'1'}
            value={damageTaken}
          />
          <DamageIndicator 
            onClick={() => takeDamage()} 
          >
            <h3>
              +{damageTaken}
            </h3>
          </DamageIndicator>
        </Container>
        <GhostButton
          style={{ marginTop: '1rem' }}
          className={`red ${damageTaken > 0 ? 'invert' : ''}`}
          onClick={() => takeDamage()}
        >
          {(damageTaken)
            ? `Take ${damageTaken} damage point${ damageTaken > 1 ? 's' : '' }` 
            : 'No damage amount selected'
          }
          
        </GhostButton>
        <Container id={'state-information'}>
          <h4>{currentStatus}</h4>
          {statusLevel > 0 &&  
            <ul>
              <li>{statusInformation[statusLevel - 1][0]}</li>
              <li>{statusInformation[statusLevel - 1][1]}</li>
            </ul>
          }{ statusLevel === 0 &&
            <ul style={{ opacity: 0 }}>
              <li> </li>
              <li> </li>
            </ul>
          }
        </Container>
      </div>
    </div>
  );
}

export default Dashboard;
