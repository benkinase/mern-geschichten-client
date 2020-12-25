import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StoryContent from "./pages/Details";
import Dashboard from "./components/Dashboard";
import Notfound from "./pages/Notfound";
import AuthRoute from "./helpers/AuthRoute";
import Signature from "./pages/Signature";

function App() {
  return (
    <div className='app'>
      <Router>
        <Header />
        <Signature />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/stories/:id' component={StoryContent} />
          <AuthRoute exact path='/profile' component={Profile} />
          <Route exact path='**' component={Notfound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
