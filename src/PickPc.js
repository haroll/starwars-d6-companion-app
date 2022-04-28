import { Link } from 'react-router-dom'
import styled from 'styled-components';
import moment from 'moment';

import Button, { GhostButton } from './components/Button';
import { GridContainer, ObsidianContainer } from "./components/Container";
import { getPCList } from "./Storage";

const PlayerCharacterListItem = styled.li`
  a {
    display: flex;
    column-gap: 1.6rem;
    margin: 2.4rem 1.6rem 3.2rem;

    .li-id {
      width: 3.2rem;
      border-top: .2rem solid var(--blue);

      p {
        color: var(--text-secondary);
        margin: 0;
        height: 1.4rem;
        line-height: 2rem;
        font-size: 3.2rem; 
      }
    }

    .pc-info {
      flex: 1 1 0;

      & > p {
        margin: 0;
      }
    }
  }
`

const PickPC = () => {
  let pcList = getPCList();
  pcList = pcList.sort((a,b) => {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  });

  console.log(typeof pcList, pcList)
  let sqrSize = window.innerWidth / 100;
  console.log(sqrSize)

  return (
    <> 
      <GridContainer
        className='centered-container'
        style={{ 
          flexDirection: 'column',
          rowGap: '2.4rem',
          zIndex: 2,
          backgroundSize: `${sqrSize}rem ${sqrSize}rem`
        }}
      >
        <div>
          <h1 className='aurebesh-droid'>Characters</h1>
          <h4>Character{pcList.length > 1 ? 's' : ''}</h4>
        </div>
        <div
          className="scroll"
          style={{ 
            flex: '1 1 100%',
            padding: '1rem 0',
          }}  
          >
          <ObsidianContainer>
            { 
              pcList.map((pc, idx) => {
                return (
                    <PlayerCharacterListItem key={pc.id}>
                      <Link to={`/u/${pc.name}?${pc.id}`}>
                        <div className='li-id'>
                          <p className='aurebesh-droid'>{idx}</p>
                        </div>
                        <div className='pc-info'>
                          <h2 className='aurebesh-droid'>{pc.name}</h2>
                          <h3>{pc.name}</h3>
                          <h4>STR: {pc.str}</h4>
                          <p style={{ color: 'var(--text-secondary' }} >{pc.statuslvl}</p>
                        </div>
                        <div className='date'>
                          <span>
                            {moment(pc.last_used, 'MM/DD/YYYY').fromNow()}
                          </span>
                        </div>
                      </Link>
                    </PlayerCharacterListItem>
                  )
                })
              }   
          </ObsidianContainer> 
        </div>
        <div style={{ flex: '1 1 0' }}>
          <Button>
            <Link to="/register?localstorage">Create player <br/><small>on LocalStorage</small></Link>
          </Button>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.6rem',
            marginTop: '1.6rem'
          }}>
            <hr style={{
              position: 'realtive',
              width: '100%'
            }} />
            <p className='default'>or</p>
            <hr style={{
              position: 'realtive',
              width: '100%'
            }} />
          </div>
          <GhostButton>
            <Link to="/register?quickplay">Quick play</Link>
          </GhostButton>
        </div>
      </GridContainer>
      <div className='bg-deco bg-grid' ></div> 
      <div className='bg-deco bg-dot' ></div>
    </>
  );
}

export default PickPC;