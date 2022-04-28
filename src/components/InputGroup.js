import React from 'react';
import styled from 'styled-components';

const TextInput = styled.input`
  display: block;
  padding: 1.2rem 1.6rem 1rem;
  border: 2px solid var(--blue);
  border-radius: .6rem;
  background-color: transparent;
  color: var(--purple);
  font-size: 1.6rem;
  font-family: 'Conthrax';
  outline: none;

  &:focus {
    outline: none;
    border-color: var(--yellow);

    ~ label {
      color: var(--yellow);
    }
  }

  &.input-error {
    color: var(--red);
    border-color: var(--red);

    ~ label {
      color: var(--red);
    }
  }
`;

const Label = styled.label`
  position: absolute;
  top: -1.1rem;
  left: 1rem;
  background-color: var(--bg-color);
  padding: .4rem 1rem;
  color: var(--blue);
  font-size: 1.2rem;
  text-shadow: none;
`;

const Group = styled.div`
  position: relative;
  display: table;

  small {
    display: inline-block;
    margin-top: .8rem;
    height: 1.4rem;
    font-size: 1.4rem;

    text-shadow: none;
    color: var(--red);
  }

  .input-error ~ small:before,
  .input-error ~ small::before {
    content: 'Ⓘ';
    margin-right: .4rem;
  }

  & + & {
    margin-top: 2.4rem;
  }

  & + button {
    margin-top: 4.8rem;
  }
`;

// const NumberButtonGroup = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 3.6rem;
//   max-height: 3.6rem;

//   position: absolute;
//   right: .4rem;
//   top: .5rem;

//   > button {
//     height: 1.8rem;
//     widht: 3.6rem;

//     text-align: center;
//     background-color: #000;
//     color: #26b;
//     border: 0;
//     outline: 0;
//   }
// `

const InputGroup = props => {

  return (
    <Group>
      <TextInput 
        id={props.id}
        type={(props.type) ? props.type : 'text'}
        {...props}
      />
      {/* {props.type === 'number' && 
        <NumberButtonGroup>
          <button>+</button>
          <button>-</button>
        </NumberButtonGroup>
      } */}
      <Label htmlFor={props.id}>
        {props.label}
      </Label>
      <small>{props.textError}</small>
    </Group>
  )
}

export default InputGroup;