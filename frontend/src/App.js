import './App.css';
import React, {Component} from 'react';
import {Link, Redirect, Route, Switch} from "react-router-dom";
import NavBar from './components/NavBar';
import Profile from './components/Profile/Profile';
import BrowseUser from './components/Users/BrowseUser';
import BrowseEvent from './components/Events/BrowseEvent';
import BrowseEvents from './components/Events/BrowseEvents';
import BrowseDocument from './components/Documents/BrowseDocument';
import BrowseDocuments from './components/Documents/BrowseDocuments';
import CreateDocuments from './components/Documents/CreateDocuments';
import Auth from './components/Users/AuthForm';
import SignUp from './components/Users/RegistrationForm';
import ConfirmUser from "./components/Users/ConfirmUser";
import EventParticipants from "./components/Events/EventParticipants";
import {Layout} from 'antd';

const { Header } = Layout;

const checkLoginned = () => {
  const login = JSON.parse(`${localStorage.getItem('login')}`) || false;
  return login === true;
}

const PrivateRoute = ({component: Component, ...rest}) => {
  const isLogin = checkLoginned();

  return (
    <Route {...rest} render={props => (
      isLogin ?
        <Component {...props} />
        : <Redirect to="/auth" />
    )} />
  );
};

const StartRoute = ({...rest}) => {
  const isLogin = checkLoginned();

  return (
    <Route {...rest} render={props => (
      isLogin ?
        <Profile {...props} />
        : <Redirect to="/auth" />
    )} />
  );
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
      name: '',
      roleId: 4
    }
  }

  componentDidMount() {
    this.checkLoginned();
  }

  checkLoginned = () => {
    const login = JSON.parse(`${localStorage.getItem('login')}`) || false;
    const isLogin = login === true;
    const user = JSON.parse(localStorage.getItem('currentUser')) || [];
    console.log(user);
    this.setState({
      isLogin,
      name: user.firstName,
      roleId: user.roleId
    })
  }

  redirectLogout = () => {
    localStorage.setItem('login', 'false');
    localStorage.removeItem('userId');
    localStorage.removeItem('currentUser');
    document.location.href = '/auth';
  }

  render() {
    const {isLogin, name, roleId} = this.state;

    return (
      <div className="App">
        <NavBar roleId={roleId} logged={isLogin}/>
        <Layout>
          <Header className="site-layout-sub-header-background" className={'header'}>
            {isLogin ?
              [
                <p className={'headerName'}>{name}</p>,
                <p onClick={this.redirectLogout} className={'headerLogout'}>Logout</p>
              ] :
              [
                <Link to="/auth">SignIn</Link>,
                <Link to="/registration">SignUp</Link>
              ]
            }

          </Header>
          <Switch>
            <Route path="/auth" exact component={Auth} />
            <StartRoute exact path="/"/>
            <PrivateRoute exact path="/profile" component={Profile} />
            <Route exact path="/registration" component={SignUp} />
            <Route exact path="/conf/:id" component={ConfirmUser} />
            <PrivateRoute path="/users/browse" exact component={BrowseUser} />
            <PrivateRoute path="/events/browse/:id" exact component={() => <BrowseEvent roleId={roleId} />} />
            <PrivateRoute path="/events/browse" exact component={() => <BrowseEvents roleId={roleId} />} />
            <PrivateRoute path="/events/parts/:id" exact component={EventParticipants} />
            <PrivateRoute path="/documents/browse/:id" exact component={() => <BrowseDocument roleId={roleId} />} />
            <PrivateRoute path="/documents/browse" exact component={() => <BrowseDocuments roleId={roleId} />} />
            <PrivateRoute path="/documents/create" exact component={CreateDocuments} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
