import React from 'react';
import styled from 'styled-components';

import Container from './components/Container';
import HealthChunk  from './components/HealthChunk';
import HealthIndicator  from './components/HealthIndicator';

const Flex = styled.div`
  display: flex;
  flex-direction: col;
  justify-content: space-between;

  & + & {
    margin-left: 1.6rem;
  }
`;

const Button = styled.button`
  background: transparent;
  border: .2rem solid #26b;
  border-radius: .6rem;
  color: #26b;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stunnedMax: 4,
      // stunnedMax: this.props.strength,
      stunnedConsumed: 3,
      // stunnedConsumed: 0,
      woundedConsumed: 1,
      // woundedConsumed: 0,
      incapacitatedConsumed: 1,
      // incapacitatedConsumed: 0,
      mortallyWoundedConsumed: 1,
      // mortallyWoundedConsumed: 0,
      currentStatus: '',
    };
  }

  removeOneStunned() {
    if (this.state.stunnedConsumed > 0) {
      let tmpStunned = this.state.stunnedConsumed - 1;
      this.setState({ stunnedConsumed: tmpStunned });
    }
  }
  removeOneWounded() {
    if (this.state.woundedConsumed > 0) {
      let tmpWounded = this.state.woundedConsumed - 1;
      this.setState({ woundedConsumed: tmpWounded });
    }
  }
  removeOneIncapacitated() {
    if (this.state.incapacitatedConsumed > 0) {
      let tmpIncapacitated = this.state.incapacitatedConsumed - 1;
      this.setState({ incapacitatedConsumed: tmpIncapacitated });
    }
  }
  removeOneMortallyWounded() {
    if (this.state.mortallyWoundedConsumed > 0) {
      let tmpMortallyWounded = this.state.mortallyWoundedConsumed - 1;
      this.setState({ mortallyWoundedConsumed: tmpMortallyWounded });
    }
  }
  resetAll() {
    // alert();
    this.setState({
      stunnedConsumed: 0,
      woundedConsumed: 0,
      incapacitatedConsumed: 0,
      mortallyWoundedConsumed: 0,
    });
  }

  updateHealthStatus() {

    this.setState({
      currentStatus: '',
    })
  }

  handleChange(ev) {
    console.log(ev.target.valueAsNumber);
  }

  render() {

    return (
      <div className="app">
        <h4 className="username aurebesh-droid">
          Username and lastname
        </h4>
        <Container id={'health-status-container'}>
          <Flex>
            <div>
              <h6 className="aurebesh-droid">
                Health
              </h6>
              <h5>
                Health Status
              </h5>
            </div>
            <Button onClick={() => this.resetAll()}>
              Reset
            </Button>
          </Flex>
          {/* @TODO: health indicator */}
          <HealthIndicator chunk={[this.state.stunnedMax,3,2,2]}>
          </HealthIndicator>
          <br/>
          <HealthChunk 
            chunkType={'stunned'}
            chunkNumber={this.state.stunnedMax} 
            chunkConsumed={this.state.stunnedConsumed}
            onClick={() => this.removeOneStunned()}
          />
          <HealthChunk 
            chunkType={'wounded'}
            chunkNumber={3} 
            chunkConsumed={this.state.woundedConsumed}
            onClick={() => this.removeOneWounded()}
          />
          <HealthChunk 
            chunkType={'incapacitated'}
            chunkNumber={2} 
            chunkConsumed={this.state.incapacitatedConsumed}
            onClick={() => this.removeOneIncapacitated()}
          />
          <HealthChunk 
            chunkType={'mortally wounded'}
            chunkNumber={2} 
            chunkConsumed={this.state.mortallyWoundedConsumed}
            onClick={() => this.removeOneMortallyWounded()}
          />
        </Container>
        <Container id={'damage-progress'}>
          <input onChange={(e) => this.handleChange(e)} style={{width: '100%'}} type={'range'} min={'1'} max={'16'} step={'1'} />
        </Container>
        <Container id={'state-information'}>
          
        </Container>
      </div>
    );
  }
}

export default App;
