import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import InputGroup from './components/InputGroup';

const CenteredContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background: linear-gradient(25deg, #26b, blue);
  border: 0;
  padding: 1rem 2.6rem;
  width: 100%;
  border-radius: .6rem;
  color: #fff;
  margin-top: 4.2rem;
  // transition: all 1s ease-in;

  & > a {
    font-size: 1.6rem;
    text-transform: uppercase;
  }
`;


const Login = props => {
  return (
    <CenteredContainer>
      <div>
        <h1 className="aurebesh-droid">Who you?</h1>
        <h4>Who you?</h4>
        <br/>
        <InputGroup
          id="player-name"
          label="Player character name"
          size="20"
        />
        <InputGroup
          id="player-str"
          label="Player STR"
          size="8"
	  min="0"
	  max="30"
          minlength="1"
          maxlength="2"
          type="number"
        />
        <Button>
          <Link to="/User">Login</Link>
        </Button>
      </div>
    </CenteredContainer>
  )
}

export default Login
