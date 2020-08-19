import React, { Component, lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "prismjs/themes/prism-tomorrow.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import TutorialPage from "./pages/TutorialPage";
// import SignUpPage from "./pages/SignUpPage";
// import SignInPage from "./pages/SignInPage";
// import ChooseMentorPage from "./pages/ChooseMentorPage";
// import SavedTutorialsPage from "./pages/SavedTutorialsPage";
// import UpdateUserInfoPage from "./pages/UpdateUserInfoPage";
import checkToken from "./utils/checkToken";
import { connect } from "react-redux";
import { setUser } from "./redux/user/actions";

const HomePage = lazy(() => import("./pages/HomePage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const ChooseMentorPage = lazy(() => import("./pages/ChooseMentorPage"));
const TutorialPage = lazy(() => import("./pages/TutorialPage"));
const SavedTutorialsPage = lazy(() => import("./pages/SavedTutorialsPage"));
const UpdateUserInfoPage = lazy(() => import("./pages/UpdateUserInfoPage"));

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
        const Loader = () => (
            <div className='loader-container'>
                <img className='loader-icon' src={require("./assets/icons/loader.svg")} alt='Loading...' />
            </div>
        );

        return (
            <Suspense fallback={<Loader />}>
                <Router>
                    <Switch>
                        <Route exact path='/' component={HomePage} />
                        <Route exact path='/sign-up' component={SignUpPage} />
                        <Route exact path='/sign-in' component={SignInPage} />
                        <Route exact path='/tutorials/:tutorialId' component={TutorialPage} />
                        <Route exact path='/mentors' component={ChooseMentorPage} />
                        <Route
                            exact
                            path='/users/saved-tutorials'
                            render={() => this.authenticate(SavedTutorialsPage)}
                        />
                        <Route exact path='/users/update-info' render={() => this.authenticate(UpdateUserInfoPage)} />
                    </Switch>
                </Router>
            </Suspense>
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
