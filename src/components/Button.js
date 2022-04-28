import styled from 'styled-components';

const ButtonBase = styled.button`
  border: 0;
  padding: 1rem 2.6rem;
  width: 100%;
  border-radius: .6rem;
  font-size: 1.6rem;
  
  & > a {
    display: block;
    width: 100%;
    font-size: 1.6rem;
    text-transform: uppercase;
  }

  small {
    color: var(--text-secondary);
    font-size: 1rem;
  }
`

const Button = styled(ButtonBase)`
  background: linear-gradient(25deg, var(--blue), blue);
  color: var(--text-important);
  transition: all 1s ease-in;
`;

const GhostButton = styled(ButtonBase)`
  // background: black;
  background-color: rgba(0,0,0,0);
  border: .2rem solid var(--blue);
  color: #26b;
  
  &:hover {
    color: var(--yellow);
    border-color: var(--yellow);
    background-color: rgba(0,0,0,.25);
  }
`

export { Button as default, GhostButton }