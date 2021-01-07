import React from 'react';
import styled from 'styled-components';

const NeonContainer = styled.div`
  position: relative;
  margin-top: 1rem;
  padding: .2rem;
  background: linear-gradient(-.5turn, #2742aa, #000, #000, #3a9de2);
  border-radius: 1rem;

  & > div {
    padding: 1.6rem;
    border-radius: .8rem;
    background-color: #000;
  }
`;

const Container = props => {
  return (
    <NeonContainer {...props}>
      <div>
        {props.children}
      </div>
    </NeonContainer>
  )
}

export default Container;