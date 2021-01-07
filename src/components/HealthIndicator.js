import React from  'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  width: calc(100% - 4.4rem);
  height: 2rem;
  padding: 0 2rem;
  border: .2rem solid #26b;
  background: transparent;
  display: flex;
  // justify-content: space-around;

  & > div {
    display: flex;
    align-content: flex-start;
    // justify-content: space-around;
  }

  & > div + div {
    margin-left: 2rem;
  }
`;

const Marker = styled.div`
  position: relative;
  z-index: 2;
  width: .2rem;
  height: 100%;
  background-color: #26b;

  & + & { margin-left: 1.6rem; }

  &:last-child {
    &:before, &::before {
      font-family: -apple-system, 'Roboto', sans-serif;
      content: 'º';
      color: #fff;
      position: relative;
      top: -1.2rem;
      left: -.1rem;
    }
    &:after, &::after {
      font-family: -apple-system, 'Roboto', sans-serif;
      content: 'º';
      color: #fff;
      position: relative;
      top: 2.3rem;
      left: -.5rem;
    }
  }
`;

const Progress = styled.div`
  position: absolute;
  top: .8rem;
  width: 10rem;
  height: .8rem;
  background-color: #7bf;

  &.w, &.i, &.mw {
    background-color: #ea2d0f;
  }
  &.w { opacity: .5; }
  &.i { opacity: .75; }
  &.mw { opacity: 1; }
  
`;

const HealthIndicator = props => {
  return (
    <div style={{position: 'relative', margin: '1.6rem 0 1rem'}}>
      <Progress className={''}/>
      <Container>
        {props.chunk.map((chunk) => {
          let idx = new Array(chunk);
          idx.fill(chunk, 0);
          console.log(idx);
          return (
           <div key={chunk} style={{flexGrow: chunk}}>
            {
              idx.map(i => {
                console.log(i);
                return (<Marker />)
              })
            }
           </div> 
          );
        })}
      </Container>
    </div>
  );
}

export default HealthIndicator;