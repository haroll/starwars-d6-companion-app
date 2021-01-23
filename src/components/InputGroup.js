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
  }
`;

const Label = styled.label`
  position: relative;
  top: .8rem;
  left: 1rem;
  background-color: black;
  padding: .4rem 1rem;
  color: #26b;
  font-size: 1.2rem;
  text-shadow: none;
`;

const Group = styled.div`
  & + & {
    margin-top: 1.6rem;
  }
`;

const InputGroup = props => {

  return (
    <Group>
      <Label htmlFor={props.id}>
        {props.label}
      </Label>
      <TextInput 
        id={props.id}
        type={(props.type) ? props.type : 'text'}
        {...props}
      />
    </Group>
  )
}

export default InputGroup;