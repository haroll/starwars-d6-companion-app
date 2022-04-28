import React from 'react';
import styled from 'styled-components';

const ObsidianContainerStyle = styled.ul`
  position: relative;
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  overflow: scroll;

  background-color: rgba(0,0,0,.2);
  border-top: .1rem solid var(--cyan);
  border-bottom: .1rem solid var(--cyan);
`;

const NeonContainer = styled.div`
  position: relative;
  margin-top: 1rem;
  padding: .2rem;
  background: linear-gradient(-.5turn, #2742aa, #000, #000, #3a9de2);
  border-radius: 1rem;

  & > div {
    padding: 1.6rem;
    border-radius: .8rem;
    background-color: var(--bg-color);
  }
`;

const GridContainer = styled.div`
//   background-image:
//     linear-gradient(to right, #171730 .1rem, transparent .1rem),
//     linear-gradient(to bottom, #171730  .1rem, transparent .1rem),
//     radial-gradient(circle, purple .1rem, rgba(255, 255, 255, 0) .1rem);
// }
`;


const ObsidianContainer = props => {
  return (
    <ObsidianContainerStyle {...props}>
      {props.children}
    </ObsidianContainerStyle>
  )
}

const Container = props => {
  return (
    <NeonContainer {...props}>
      <div>
        {props.children}
      </div>
    </NeonContainer>
  )
}

export { Container as default, GridContainer, ObsidianContainer };