import React, {Component} from 'react';
import './Video.css';

// Import custom components
import Home from './Home.js'
import Account from './Account/Account.js'
import Logout from './Account/Logout.js'
import Signup from './Account/Signup.js'
import Verify from './Account/Verify.js'
import Reset from './Account/Reset.js'
import AddCard from './Subscription/AddCard.js'
import Nav from './Nav.js'
import Video from './Video.js'
import CurrentPlan from './Plan/CurrentPlan.js'

import { render } from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

var authUtils = require('./utils/auth.js');

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn: authUtils.hasAuth()
        };
    }

    onAuthStateChange(loggedIn) {
        this.state = {
            loggedIn: loggedIn
        };
    }

    render() {
        var homeRoute = "/"

        if(this.state.loggedIn) {
            homeRoute = "/video"
        }

        return (
            <MuiThemeProvider>
                <div>
                    <div className="pure-menu pure-menu-horizontal">
                        <a href={homeRoute} className="pure-menu-heading"><img src="/images/DashVid.svg" alt="DashVid.io" height="40px" /></a>
                        <Nav loggedIn={this.state.loggedIn} />
                        <Logout loggedIn={this.state.loggedIn} loggedInCallback={(loggedIn) => this.onAuthStateChange(loggedIn)} />
                        <CurrentPlan loggedIn={this.state.loggedIn}  />
                    </div>


                    <div className="banner">
                        <h1 className="banner-head">
                            Simple Pricing.<br />
                            Try before you buy.
                        </h1>
                    </div>

                    <div className="l-content">

                        <Router history={browserHistory}>
                            <Route path="/" >
                                <IndexRoute component={Home} />
                                <Route path="video" component={Video} />
                                <Route path="account" component={Account} />
                                <Route path="signup" component={Signup} loggedIn={this.state.loggedIn} loggedInCallback={(loggedIn) => this.onAuthStateChange(loggedIn)} />
                                <Route path="verify" component={Verify} />
                                <Route path="reset" component={Reset} />
                            </Route>
                            <Route path="subscription" >
                                <Route path="addCard" component={AddCard} />
                            </Route>
                        </Router>

                    </div>

                    <div className="footer l-box">
                        <p>
                            <a href="#">Terms &amp; Conditions</a> | <a href="#">Privacy Policy</a>
                        </p>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }

}

export default App;

render(
    <App />,
    document.getElementById('container')
);

