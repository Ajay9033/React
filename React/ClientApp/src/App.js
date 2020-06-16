import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { AboutUs } from './components/AboutUs';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { DashBoard } from './components/Dashboard';
import { ForgotPassword } from './components/ForgotPassword';
import { Tbl } from './components/Tbl';
import { AddUser } from './components/AddUser';
import { MyProfile } from './components/MyProfile';
import { Welcome } from './components/Welcome';
import { EditUser } from './components/EditUser';
import { DeleteUser } from './components/DeleteUser'
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/Aboutus' component={AboutUs} />
            <Route path='/Dashboard' component={DashBoard} />
            <Route path='/ForgotPassword' component={ForgotPassword} />
            <Route path='/Home' component={Home} />
            <Route path='/Tbl' component={Tbl} />
            <Route path='/AddUser' component={AddUser} />
            <Route path='/MyProfile' component={MyProfile} />
            <Route path='/Welcome' component={Welcome} />
            <Route path='/EditUser' component={EditUser} />
            <Route path='/DeleteUser' component={DeleteUser} />

      </Layout>
    );
  }
}
