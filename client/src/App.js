import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import { AuthRoute, ProtectedRoute } from './utils/routeUtils';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Edit from './components/cdn/Edit';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <AuthRoute exact path="/login" component={Login} />
        <ProtectedRoute exact path="/edit" component={Edit} />
      </div>
    </Router>
  );
}

export default App;
