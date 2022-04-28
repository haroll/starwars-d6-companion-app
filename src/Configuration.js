import { Link } from 'react-router-dom';
import Button, { GhostButton } from "./components/Button";

const Configuration = () => {

  return (
    <div style={{ margin: '0 1.6rem', maxWidth: '37.5rem' }}>
      <h1 style={{ fontSize: '4.8rem' }}className='default'>Configuration</h1>
      <p className='default'>It looks like it's your first time here</p>
      <h4 className='default'>Congratulation and welcome!!</h4>
      <p className='default'>To take full advantage of this application we advise you to create a new character and to save him/her/them on the LocalStorage. That way your character will be saved on your device and you can use it again later</p>
      <Button>
        <Link to="/register?localstorage">Create player on LocalStorage</Link>
      </Button>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.6rem',
        marginTop: '1.6rem'
      }}>
        <hr style={{
          position: 'realtive',
          width: '100%'
        }} />
        <p className='default'>or</p>
        <hr style={{
          position: 'realtive',
          width: '100%'
        }} />
      </div>
      <p  className='default'>Just click below so you can play right now. Be aware that there is <u>no way right now</u> for you to save your character later on</p>
      <GhostButton>
        <Link to="/register?quickplay">Quick play</Link>
      </GhostButton>
    </div>
  )
}

export default Configuration;