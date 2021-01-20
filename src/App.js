import React from 'react';
import styled from 'styled-components';

import Container from './components/Container';
import DamageRanger from './components/DamageRanger';
import HealthChunk  from './components/HealthChunk';
// import HealthIndicator  from './components/HealthIndicator';

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

const DamageIndicator = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;

  height: 2.4rem;
  width: 4rem;
  padding: 0 .3rem;

  background: linear-gradient(to left, #980605 0%, #800 5%, #980605 10%, #800 15%, #980605 20%, #800 25%, #980605  30%, #800 35%, #980605 40%, #800 45%, #980605 50%, #800 55%, #980605 60%, #800 65%, #980605 70%, #800  75%, #980605 80%, #800 85%, #980605 90%, #800 95%, #980605 100%);
  & > h3 { color: red; }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stunnedMax: 4,
      // stunnedMax: this.props.strength,
      // stunnedConsumed: 3,
      stunnedConsumed: 0,
      // woundedConsumed: 1,
      woundedConsumed: 0,
      // incapacitatedConsumed: 1,
      incapacitatedConsumed: 0,
      // mortallyWoundedConsumed: 1,
      mortallyWoundedConsumed: 0,
      currentStatus: '',
      damageTaken: 0,
      preventDoubleTap: true,
      prone: false,
      statusLevel: 0
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
    if (window.confirm('Are you sure you want to reset your health status? (previous state cannot be retrieved yet)' )) {
      this.setState({
        stunnedConsumed: 0,
        woundedConsumed: 0,
        incapacitatedConsumed: 0,
        mortallyWoundedConsumed: 0,
        currentStatus: '',
        prone: false,
        statusLevel: 0,
      });
    } 
  }

  updateHealthStatus() {
    this.setState({
      currentStatus: '',
    })
  }

  handleChange(ev) {
    this.setState({
      damageTaken: ev.target.valueAsNumber,
      preventDoubleTap: false,
    })
  }

  takeDamage() {
    if (this.state.preventDoubleTap) {
      return;
    }

// STUNNED
    if (this.state.damageTaken < 4) {
      if (this.state.stunnedConsumed + 1 === this.state.stunnedMax 
        && this.state.woundedConsumed < 3)  {
          const woundedDamge = this.state.woundedConsumed + 1;
          this.setState({ 
            prone: true,
            statusLevel: 1,
            stunnedConsumed: this.state.stunnedConsumed + 1,
            woundedConsumed: woundedDamge
          })
      } else if (this.state.stunnedConsumed < this.state.stunnedMax) {
        this.setState({ stunnedConsumed: this.state.stunnedConsumed + 1 })  
      }

// WOUNDED
    } else if (this.state.damageTaken < 9) {
      if (this.state.woundedConsumed + 1 === 3
        && this.state.incapacitatedConsumed < 2) {
          const incapacitatedDamage = this.state.incapacitatedConsumed + 1;
          const woundedDamge = this.state.woundedConsumed + 1;
          this.setState({
            prone: true,
            statusLevel: 2,
            stunnedConsumed: this.state.stunnedMax,
            woundedConsumed: woundedDamge,
            incapacitatedConsumed: incapacitatedDamage
          })
      } else if (this.state.woundedConsumed < 3) {
        const woundedDamge = this.state.woundedConsumed + 1;
        this.setState({ 
          prone: true,
          statusLevel: 1,
          stunnedConsumed: this.state.stunnedMax,
          woundedConsumed: woundedDamge 
        })
      }

// INCAPACITATED
    } else if (this.state.damageTaken < 13) {
      if (this.state.incapacitatedConsumed + 1 === 2
        && this.state.mortallyWoundedConsumed < 2) {
          const mortallyWoundedDamage = this.state.mortallyWoundedConsumed + 1;
          this.setState({
            prone: true,
            statusLevel: 3,
            stunnedConsumed: this.state.stunnedMax,
            woundedConsumed: 3,
            incapacitatedConsumed: 2,
            mortallyWoundedConsumed: mortallyWoundedDamage
          })
      } else if (this.state.incapacitatedConsumed < 2) {
        const incapacitatedDamage = this.state.incapacitatedConsumed + 1;
        this.setState({ 
          prone: true,
          statusLevel: 2,
          stunnedConsumed: this.state.stunnedMax,
          woundedConsumed: 3,
          incapacitatedConsumed: incapacitatedDamage 
        })
      }

// MORTALLY WOUNDED
    } else if (this.state.damageTaken < 16) {
      if (this.state.mortallyWoundedConsumed + 1 === 2) {
        this.setState({
          prone: true,
          statusLevel: 0,
          stunnedConsumed: this.state.stunnedMax,
          woundedConsumed: 3,
          incapacitatedConsumed: 2,
          mortallyWoundedConsumed: 2
        })  
      } else if (this.state.mortallyWoundedConsumed < 2) {
        const mortallyWoundedDamage = this.state.mortallyWoundedConsumed + 1;
        this.setState({ 
          prone: true,
          statusLevel: 3,
          stunnedConsumed: this.state.stunnedMax,
          woundedConsumed: 3,
          incapacitatedConsumed: 2,
          mortallyWoundedConsumed:  mortallyWoundedDamage 
        })
      }
      
// SUPER DEAD
    } else {
      this.setState({
        stunnedConsumed: this.state.stunnedMax,
        statusLevel: 0,
        woundedConsumed: 3,
        incapacitatedConsumed: 2,
        mortallyWoundedConsumed: 2
      })
    }
    this.setState({ 
      damageTaken: 0,
      preventDoubleTap: true,
    })
  }

  render() {
    let statusInformation  = [
      [
        'cannot take action until next round',
        `-${this.state.woundedConsumed}D to skill and attribute rolls until healed`
      ],
      [
        'knocked unconscious for 10D minutes',
        'cannot do anything until healed'
      ],
      [
        'cannot do anything until healed',
        'at the end of each round roll 2D. If the result < number of round. Being mortally wounded Character dies'
      ],
    ];

    console.log(this.state.statusLevel)

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
          <DamageRanger 
            damage={this.state.damageTaken}
          />
          <input 
            onChange={(e) => this.handleChange(e)} 
            style={{
              position: 'absolute',
              top: '6rem',
              width: 'calc(100% - 4rem)',
              opacity: '0'
            }}
            type={'range'}
            min={'1'}
            max={'16'}
            step={'1'}
            value={this.state.damageTaken}
          />
          <DamageIndicator onClick={() => this.takeDamage()} >
            <h3>
              +{this.state.damageTaken}
            </h3>
          </DamageIndicator>
        </Container>
        <Container id={'state-information'}>
          {this.state.prone && 
            <h4>Prone</h4>
          }
          {this.state.statusLevel > 0 &&  
            <ul>
              <li>{statusInformation[this.state.statusLevel - 1][0]}</li>
              <li>{statusInformation[this.state.statusLevel - 1][1]}</li>
            </ul>
          }
        </Container>
      </div>
    );
  }
}

export default App;
