import React from 'react';
import styled from 'styled-components';

const TextInput = styled.input`
  display: block;
  padding: 1.2rem 1.6rem 1rem;
  border: 2px solid #26b;
  border-radius: .6rem;
  background-color: transparent;
  color: #7e84e6;
  font-size: 1.6rem;
  font-family: 'Conthrax';
  outline: none;

  &:focus {
    outline: none;
    border-color: #ffe919;

    ~ label {
      color: #ffe919;
    }
  }
`;

const Label = styled.label`
  position: absolute;
  top: -1.1rem;
  left: 1rem;
  background-color: black;
  padding: .4rem 1rem;
  color: #26b;
  font-size: 1.2rem;
  text-shadow: none;
`;

const Group = styled.div`
  position: relative;
  display: table;

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
    </Group>
  )
}

export default InputGroup;