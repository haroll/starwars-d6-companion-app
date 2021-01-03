import Container from './components/Container';
import HealthChunk  from './components/HealthChunk';

function App() {
  return (
      <div className="app">
        <h4 className="username aurebesh-droid">
          Username and lastname
        </h4>
        <Container id={'health-status-container'}>
          <h6 className="aurebesh-droid">
            Health
          </h6>
          <h5>
            Health Status
          </h5>
          {/* @TODO: health indicator */}
          {/* @TODO: HealthChunk.map */}
          <br/>
          <HealthChunk chunkNumber={3} chunkConsumed={3} chunkType={'STUNNED'}/>
          <HealthChunk chunkNumber={3} chunkConsumed={1} chunkType={'WOUNDED'}/>
          <HealthChunk chunkNumber={2} chunkConsumed={0} chunkType={'INCAPACITATED'}/>
          <HealthChunk chunkNumber={2} chunkConsumed={0} chunkType={'MORTALLY WOUNDED'}/>
        </Container>
      </div>
  );
}

export default App;
