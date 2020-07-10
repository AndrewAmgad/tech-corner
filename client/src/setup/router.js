import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/home';
import SignIn from '../pages/auth/sign-in';
import SignUp from '../pages/auth/sign-up';
import SellItem from '../pages/sell-item'

export default class Router extends Component {
    render(){
        return (
            <Switch>
                <Route exact path='/home' component={HomePage} />
                <Route path='/signin' component={SignIn} />
                <Route path='/signup' component={SignUp} />
                <Route path='/sell' component={SellItem} /> 
                <Route component={HomePage} />  
            </Switch>
        )
    }
}