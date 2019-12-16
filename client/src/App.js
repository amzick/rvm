import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import './App.css';

import { AuthRoute, ProtectedRoute } from './utils/routeUtils';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import EditPage from './components/cdn/EditPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Landing} />
        <AuthRoute exact path="/login" component={Login} />
        <ProtectedRoute exact path="/edit" component={EditPage} />
        <Route exact path ='/about'><Redirect to='/#/about' /></Route>
        <Route exact path ='/plays'><Redirect to='/#/plays' /></Route>
        <Route exact path ='/writing'><Redirect to='/#/writing' /></Route>
        <Route exact path ='/youth'><Redirect to='/#/youth' /></Route>
      </div>
    </Router>
  );
}

export default App;
