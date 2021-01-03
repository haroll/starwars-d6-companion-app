import React from 'react';
import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  flex-direction: col;
  // justify-content: space-between;

  &.empty {
    opacity: 0.25;
  }

  & + & {
    margin-top: 1.6rem;
  }
`;

const ChunkContainer = styled.div`
  position: relative;
  display: block;
  width: 6.8rem;
  height: 6.8rem;
  margin-right: 1.6rem;

  border-radius: 100%;
  background-color: #fff;

  &.full > .middle {
    background-color: #ea2d0f;

    & > .center { background-color: #ea2d0f; }
  }

  & > .middle {
    position: absolute;
    top: 1.8rem;
    left: 1.8rem; 
    width: 2.2rem;
    height: 2.2rem;
    border: .5rem solid black;
    border-radius: 100%;
    background-color: #f9e1f2;

    &.black {
      background-color: #000;
    }
    
    & > .center {
      position: absolute;
      top: .6rem;
      left: .6rem; 
      width: .8rem;
      height: .8rem;
      border: .1rem solid black;
      border-radius: 100%;
      background-color: #f9e1f2;
    }
  }
`;

const renderingChunks = (maxChunk, emptyChunks) => {
  if (maxChunk > emptyChunks) {
    let tmpStr = 'conic-gradient(#000 0deg 5deg';
    const chunkSize = (360 - (10 * maxChunk)) / maxChunk;
    let currentDeg = 5;

    while (maxChunk--) {
      tmpStr += `,${(emptyChunks-- > 0) ? '#26b' : '#f9e1f2'} ${currentDeg}deg ${currentDeg + chunkSize}deg,`;
      currentDeg += chunkSize;
      tmpStr += `#000 ${currentDeg}deg ${currentDeg + 10}deg`
      currentDeg += 10;
    }
    tmpStr += `)`;
    return { background: tmpStr };
  } else if (maxChunk === emptyChunks) {
    return { background: '#ea2d0f'}
  } else {
    return null
  }
}

const HealthChunck = props => {
  const chunkStyle = renderingChunks(props.chunkNumber, props.chunkConsumed);
  let full = (props.chunkConsumed === props.chunkNumber) ? true : false;

  return (
    <Flex className={!props.chunkConsumed ? 'empty' : ''}>
      <div>
        <ChunkContainer style={chunkStyle} className={(full) ? 'full' : ''}>
          {
            (props.chunkConsumed) 
              ?
              <div className="middle">
                <div className="center"></div>
              </div>
              :
              <div className="middle black"></div>
          }
        </ChunkContainer>
      </div>
      <div style={{flexGrow: 2}}>
        <h6 className="aurebesh-droid">
          Current status
        </h6>
        <h5>
          Current Status
        </h5>
        <hr/>
        <h5 className="danger">
          {props.chunkConsumed}x {props.chunkType}
        </h5>
      </div>
    </Flex>
  );
}

export default HealthChunck;