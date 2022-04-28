import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import App from './App';
import Dashboard from './UserDashboard';
import Register from './Register';
import Configuration from './Configuration';
import PickPC from './PickPc';

import './main.css';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="pc" element={<PickPC />} />
        <Route path="u" >
          <Route path=":name" element={<Dashboard />} />
        </Route>
        <Route path="config" element={<Configuration />} />
        <Route path="register" element={<Register />} />
        <Route 
          path="*"
          element={
            <main>
              <p>404</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);