import React, { Component } from "react";
import "./style.css";
import { Form, FormInput, FormGroup, Button } from "shards-react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signIn, clearErrors } from "../../redux/user/actions";
import queryString from "query-string";

class SignInPage extends Component {
    state = { email: "", password: "" };

    handleEmail = (e) => {
        this.setState({ email: e.target.value });
    };
    handlePassword = (e) => {
        this.setState({ password: e.target.value });
    };
    submitForm = (e) => {
        e.preventDefault();
        this.props.signInReq({ email: this.state.email, password: this.state.password });
    };

    componentWillUnmount() {
        this.props.clearErrorsReq();
    }

    render() {
        const { isAuthenticated, isLoading, errorsFromStore: errors } = this.props;
        const { tutorial: tutorialId, mentor: mentorId } = queryString.parse(this.props.location.search);

        const EmailError = () => {
            if (errors.email && errors.email.includes("exist")) {
                return <div className='text-danger mt-1'>Email không tồn tại</div>;
            }
            if (errors.email && errors.email.includes("required")) {
                return <div className='text-danger mt-1'>Vui lòng nhập vào email</div>;
            }
            return null;
        };
        const PasswordError = () => {
            if (errors.password && errors.password.includes("does not match")) {
                return <div className='text-danger mt-1'>Mật khẩu không đúng</div>;
            }
            if (errors.password && errors.password.includes("required")) {
                return <div className='text-danger mt-1'>Vui lòng nhập vào mật khẩu</div>;
            }
            return null;
        };

        if (isAuthenticated && !tutorialId && !mentorId) {
            return <Redirect to='/' />;
        } else if (isAuthenticated && tutorialId) {
            return <Redirect to={`/tutorials/${tutorialId}`} />;
        } else if (isAuthenticated && mentorId) {
            return <Redirect to={`/mentors?mentor=${mentorId}`} />;
        } else {
            return (
                <div className='bg-primary w-100 sign-in'>
                    <div className='container h-100 w-100 position-relative'>
                        <div className='form-container px-3 d-flex flex-column bg-white'>
                            <h3 className='mb-3 text-center'>Đăng Nhập</h3>
                            <Form onSubmit={this.submitForm}>
                                <FormGroup>
                                    <label htmlFor='email'>Email</label>
                                    <FormInput
                                        invalid={errors.email ? true : false}
                                        placeholder='Email'
                                        id='email'
                                        onChange={this.handleEmail}
                                    />
                                    <EmailError />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor='password'>Password</label>
                                    <FormInput
                                        invalid={errors.password ? true : false}
                                        type='password'
                                        placeholder='Password'
                                        id='password'
                                        onChange={this.handlePassword}
                                    />
                                    <PasswordError />
                                </FormGroup>
                                <Button block disabled={isLoading} type='submit' onClick={this.submitForm}>
                                    {isLoading ? "Đang Đăng Nhập ..." : "Đăng Nhập"}
                                </Button>
                                <div className='mt-3 text-center'>
                                    <span>Bạn chưa có tài khoản </span>
                                    <Link className='text-decoration-none' to='/sign-up'>
                                        Đăng Ký
                                    </Link>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
    errorsFromStore: state.user.errors,
    isLoading: state.user.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
    signInReq: (user) => dispatch(signIn(user)),
    clearErrorsReq: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
