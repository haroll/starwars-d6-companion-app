import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { StorageAvailable } from './Storage';

const App = props => {
  let goto = useNavigate();

  useEffect(() => {
    if (StorageAvailable('localStorage')) {
      if (!localStorage.getItem('pc_nbr')) {
        goto('/config')
      } else
        goto('/pc')
    } else {
      console.log('fuck')
    }

  }, [])

  return <Outlet />;
}

export default App;