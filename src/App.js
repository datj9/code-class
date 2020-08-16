import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "prismjs/themes/prism-tomorrow.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import TutorialPage from "./pages/TutorialPage";
import SavedTutorialsPage from "./pages/SavedTutorialsPage";
import checkToken from "./utils/checkToken";
import { connect } from "react-redux";
import { setUser } from "./redux/user/actions";
import ChooseMentorPage from "./pages/ChooseMentorPage";

class App extends Component {
    authenticate = (Page) => {
        const { isAuthenticated } = this.props;

        if (isAuthenticated) {
            return <Page />;
        }
        return <Redirect to='/sign-in' />;
    };

    componentDidMount() {
        const { isValid, user } = checkToken();

        if (isValid) {
            this.props.setUser(user);
        }
    }
    render() {
        return (
            <Router>
                <Header />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/sign-up' component={SignUpPage} />
                    <Route exact path='/sign-in' component={SignInPage} />
                    <Route exact path='/tutorials/:tutorialId' component={TutorialPage} />
                    <Route exact path='/mentors' component={ChooseMentorPage} />
                    <Route exact path='/users/saved-tutorials' render={() => this.authenticate(SavedTutorialsPage)} />
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
    setUser: (user) => dispatch(setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
