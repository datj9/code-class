import React, { Component } from "react";
import "./style.scss";
import { Form, FormInput, FormGroup, Button } from "shards-react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp, clearErrors } from "../../redux/user/actions";
import withHeader from "../../HOC/withHeader";

class SignUpPage extends Component {
    state = { email: "", password: "", confirmPassword: "", name: "" };

    handleEmail = (e) => {
        this.setState({ email: e.target.value });
    };
    handlePassword = (e) => {
        this.setState({ password: e.target.value });
    };
    handleConfirmPassword = (e) => {
        this.setState({ confirmPassword: e.target.value });
    };
    handleName = (e) => {
        this.setState({ name: e.target.value });
    };
    submitForm = (e) => {
        e.preventDefault();
        this.props.signUpReq({
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            name: this.state.name,
        });
    };

    componentWillUnmount() {
        this.props.clearErrorsReq();
    }

    render() {
        const { isAuthenticated, isLoading, errorsFromStore: errors } = this.props;

        const EmailError = () => {
            const { email } = errors;
            if (email && email.includes("required")) {
                return <div className='text-danger mt-1'>Vui lòng nhập vào email</div>;
            }
            if (email && email.includes("exist")) {
                return <div className='text-danger mt-1'>Email đã tồn tại</div>;
            }
            if (email && email.includes("not valid")) {
                return <div className='text-danger mt-1'>Email không hợp lệ</div>;
            }
            return null;
        };
        const PasswordError = () => {
            const { password } = errors;
            if (password && password.includes("required")) {
                return <div className='text-danger mt-1'>Vui lòng nhập vào mật khẩu</div>;
            }
            if (password && password.includes("weak")) {
                return <div className='text-danger mt-1'>Mật khẩu phải có ít nhất 8 ký tự</div>;
            }
            return null;
        };

        const ConfirmPasswordError = () => {
            const { confirmPassword } = errors;
            if (confirmPassword && confirmPassword.includes("required")) {
                return <div className='text-danger mt-1'>Vui lòng nhập vào phần xác nhận mật khẩu</div>;
            }
            if (confirmPassword && confirmPassword.includes("does not match")) {
                return <div className='text-danger mt-1'>Xác nhận mật khẩu không khớp với mật khẩu</div>;
            }
            return null;
        };

        const NameError = () => {
            const { name } = errors;
            if (name && name.includes("required")) {
                return <div className='text-danger mt-1'>Vui lòng nhập vào tên</div>;
            }
            return null;
        };

        if (isAuthenticated) {
            return <Redirect to='/' />;
        }
        return (
            <div className='bg-primary signup'>
                {/* <div className='container w-100 h-100'> */}
                <div className='form-container d-flex flex-column bg-white'>
                    <h3 className='mb-3 text-center'>Đăng ký tài khoản</h3>
                    <Form className='d-flex flex-column w-100' onSubmit={this.submitForm}>
                        <FormGroup>
                            <label htmlFor='email'>Email</label>
                            <FormInput
                                invalid={errors.email ? true : false}
                                id='email'
                                placeholder='Email'
                                onChange={this.handleEmail}
                            />
                            <EmailError />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor='name'>Họ Tên</label>
                            <FormInput
                                invalid={errors.name ? true : false}
                                type='text'
                                placeholder='Họ Tên'
                                id='name'
                                onChange={this.handleName}
                            />
                            <NameError />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor='password'>Mật khẩu</label>
                            <FormInput
                                invalid={errors.password ? true : false}
                                type='password'
                                placeholder='Mật khẩu'
                                id='password'
                                onChange={this.handlePassword}
                            />
                            <PasswordError />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor='confirmPassword'>Xác nhận mật khẩu</label>
                            <FormInput
                                invalid={errors.confirmPassword ? true : false}
                                type='password'
                                placeholder='Xác nhận mật khẩu'
                                id='confirmPassword'
                                onChange={this.handleConfirmPassword}
                            />
                            <ConfirmPasswordError />
                        </FormGroup>
                        <Button
                            className='w-50 align-self-center'
                            disabled={isLoading}
                            type='submit'
                            onClick={this.submitForm}
                        >
                            {isLoading ? "Đang Đăng Ký ..." : "Đăng Ký"}
                        </Button>
                        <div className='mt-2 text-center'>
                            <span>Bạn đã có tài khoản </span>
                            <Link className='text-decoration-none' to='/sign-in'>
                                Đăng Nhập
                            </Link>
                        </div>
                    </Form>
                </div>
                {/* </div> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
    errorsFromStore: state.user.errors,
    isLoading: state.user.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
    signUpReq: (user) => dispatch(signUp(user)),
    clearErrorsReq: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withHeader(SignUpPage));
