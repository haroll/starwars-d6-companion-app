import React from 'react';
import styled from 'styled-components';

const GraphBarDamageIndicator = styled.div`
  background: linear-gradient(to left, black 0%, red 5%, black 10%, red 15%, black 20%, red 25%, black  30%, red 35%, black 40%, red 45%, black 50%, red 55%, black 60%, red 65%, black 70%, red  75%, black 80%, red 85%, black 90%, red 95%, black 100%);
  width: 100%;
  
  & + &  { margin-left: 1px; }
`;

const GraphContainer = styled.div`
  position: relative;

  & > .graph {
    display: flex;
    direction: column;
    
    width:  100%;
    height: 6rem;
    
    & > div {
      display: flex;
      direction-column;
      align-items: flex-end;
      height: 100%;
      padding: 0 .2rem;
      // border-bottom: .1rem solid #3a9de2;
    }

    & > .stunned { 
      flex-grow: 3;
      // margin-right: .1rem;
      
      & > ${GraphBarDamageIndicator} {
        height: 40%;
        opacity: 0.4;
      }
    }
    & > .wounded { 
      flex-grow: 5; 
      // margin-right: .1rem;
      border-left: .1rem solid #3a9de2;
      
      & > ${GraphBarDamageIndicator} {
        height: 55%;
        opacity: 0.55;
      }
    }
    & > .incapacitated {
      flex-grow: 4;
      // margin-right: .1rem;
      border-left: .1rem solid #3a9de2;
      
      & > ${GraphBarDamageIndicator} {
        height: 70%;
        opacity: .7;
      }
    }
    & > .mortally-wounded {
      flex-grow: 3;
      // margin-right: .1rem;
      border-left: .1rem solid #3a9de2;
      
      & > ${GraphBarDamageIndicator} {
        height: 85%;
        opacity: 0.85;
      }
    }
    & > .dead {
      flex-grow: 1;
      border-left: .1rem solid #3a9de2;
      
      & > ${GraphBarDamageIndicator} {
        height: 100%;
      }
    }
  }
  
  & > .caption {
    width:  100%;
    height: 2rem;
  }
`;

const DamageRanger = props => {
  return (
    <GraphContainer>
      <div className="graph">
        <div className="stunned">
          <GraphBarDamageIndicator style={{ opacity: (props.damage - 1 >= 0) ? 1 : 0 }}/>
          <GraphBarDamageIndicator style={{ opacity: (props.damage - 2 >= 0) ? 1 : 0 }}/>
          <GraphBarDamageIndicator style={{ opacity: (props.damage - 3 >= 0) ? 1 : 0 }}/>
        </div>
        <div className="wounded">
          <GraphBarDamageIndicator style={{ opacity: (props.damage - 4 >= 0) ? 1 : 0 }}/>
          <GraphBarDamageIndicator style={{ opacity: (props.damage - 5 >= 0) ? 1 : 0 }}/>
          <GraphBarDamageIndicator style={{ opacity: (props.damage - 6 >= 0) ? 1 : 0 }}/>
          <GraphBarDamageIndicator style={{ opacity: (props.damage - 7 >= 0) ? 1 : 0 }}/>
          <GraphBarDamageIndicator style={{ opacity: (props.damage - 8 >= 0) ? 1 : 0 }}/>
        </div>
        <div className="incapacitated">
          <GraphBarDamageIndicator style={{ opacity: (props.damage - 9 >= 0) ? 1 : 0 }}/>
          <GraphBarDamageIndicator style={{ opacity: (props.damage - 10 >= 0) ? 1 : 0 }}/>
          <GraphBarDamageIndicator style={{ opacity: (props.damage - 11 >= 0) ? 1 : 0 }}/>
          <GraphBarDamageIndicator style={{ opacity: (props.damage - 12 >= 0) ? 1 : 0 }}/>
        </div>
        <div className="mortally-wounded">
          <GraphBarDamageIndicator style={{ opacity: (props.damage - 13 >= 0) ? 1 : 0 }}/>
          <GraphBarDamageIndicator style={{ opacity: (props.damage - 14 >= 0) ? 1 : 0 }}/>
          <GraphBarDamageIndicator style={{ opacity: (props.damage - 15 >= 0) ? 1 : 0 }}/>
        </div>
        <div className="dead">
          <GraphBarDamageIndicator style={{ opacity: (props.damage - 16 >= 0) ? 1 : 0 }}/>
        </div>
      </div>
      {/* <div className="caption">
      </div> */}
    </GraphContainer>
  )
}

export default DamageRanger;