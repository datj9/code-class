import React, { Component, createRef } from "react";
import "./style.css";
import { Button, Collapse } from "shards-react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../redux/user/actions";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { collapseOpen: false, accountMenuOpen: false };
        this.navbarTogglerRef = createRef();
        this.collapseMenuRef = createRef();
        this.accountIconRef = createRef();
        this.accountMenuRef = createRef();
    }
    toggleNavbar = () => {
        this.setState((state) => ({ collapseOpen: !state.collapseOpen, accountMenuOpen: false }));
    };
    closeNavbar = () => {
        this.setState({ collapseOpen: false });
    };
    toggleAccountMenu = () => {
        this.setState((state) => ({ accountMenuOpen: !state.accountMenuOpen, collapseOpen: false }));
    };
    closeAccountMenu = () => {
        this.setState({ accountMenuOpen: false });
    };
    signOutReq = () => {
        this.toggleAccountMenu();
        this.props.signOut();
    };
    handleClick = (e) => {
        if (
            this.state.collapseOpen &&
            !this.navbarTogglerRef.current?.contains(e.target) &&
            !this.collapseMenuRef.current?.contains(e.target)
        ) {
            this.closeNavbar();
        } else if (
            this.state.accountMenuOpen &&
            !this.accountIconRef.current?.contains(e.target) &&
            !this.accountMenuRef.current?.contains(e.target)
        ) {
            this.closeAccountMenu();
        }
    };

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClick);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClick);
    }
    render() {
        const { currentUser, isAuthenticated } = this.props;
        const { collapseOpen, accountMenuOpen } = this.state;
        const {
            toggleNavbar,
            closeNavbar,
            toggleAccountMenu,
            navbarTogglerRef,
            collapseMenuRef,
            accountIconRef,
            accountMenuRef,
        } = this;
        return (
            <div id='header' className='navbar navbar-expand-md navbar-light bg-white'>
                <div className='d-flex'>
                    <button ref={navbarTogglerRef} className='navbar-toggler' type='button' onClick={toggleNavbar}>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <NavLink onClick={closeNavbar} to='/' className='brand text-dark text-decoration-none'>
                        Code Class
                    </NavLink>
                </div>

                <Collapse className='justify-content-end bg-white' open={collapseOpen} navbar>
                    <div ref={collapseMenuRef} className='navbar-nav'>
                        <li className='nav-item d-flex align-items-center justify-content-center'>
                            <NavLink onClick={closeNavbar} className='nav-link' to='/mentors'>
                                Mentor
                            </NavLink>
                        </li>
                        {isAuthenticated ? null : (
                            <li className='nav-item large-screen-signup-btn'>
                                <NavLink className='nav-link' to='/sign-up'>
                                    <Button pill>Đăng ký</Button>
                                </NavLink>
                            </li>
                        )}
                        {isAuthenticated ? null : (
                            <li className='nav-item large-screen-login-btn'>
                                <NavLink className='nav-link' to='/sign-in'>
                                    <Button pill outline>
                                        Đăng nhập
                                    </Button>
                                </NavLink>
                            </li>
                        )}
                    </div>
                </Collapse>
                {isAuthenticated ? (
                    <span ref={accountIconRef} role='button' onClick={toggleAccountMenu} className='profile-image'>
                        {currentUser.profileImageURL ? (
                            <img src={currentUser.profileImageURL} alt='profile' />
                        ) : (
                            <span className='name-icon w-100 h-100 d-flex align-items-center justify-content-center rounded-circle bg-primary text-white'>
                                {currentUser.name.trim().split(" ")[0][0]}
                                {currentUser.name.trim().split(" ")[currentUser.name.trim().split(" ").length - 1][0]}
                            </span>
                        )}
                    </span>
                ) : (
                    <div className='btn-wp w-50 justify-content-end position-absolute btn-wp'>
                        <i className='fas fa-user' />
                        <Link to='/sign-in' role='button'>
                            <Button outline>Đăng Nhập</Button>
                        </Link>
                        <Link to='/sign-up' className='mr-2 ml-3'>
                            <Button>Đăng Ký</Button>
                        </Link>
                    </div>
                )}
                {accountMenuOpen && isAuthenticated ? (
                    <div ref={accountMenuRef}>
                        <ul className='account-menu bg-white'>
                            <li className='name mb-3'>{currentUser.name}</li>
                            <li>
                                <Link
                                    onClick={toggleAccountMenu}
                                    className='text-primary text-decoration-none'
                                    to='/users/saved-tutorials'
                                >
                                    Bài đã lưu
                                </Link>
                            </li>
                            <li className='text-primary'>
                                <Link
                                    onClick={toggleAccountMenu}
                                    className='text-decoration-none'
                                    to='/users/update-info'
                                >
                                    Cập nhật thông tin
                                </Link>
                            </li>

                            <Link
                                onClick={this.signOutReq}
                                className='log-out-btn d-block mx-auto mt-3 text-primary text-decoration-none'
                                to='/'
                            >
                                <Button className='w-100'>Đăng xuất</Button>
                            </Link>
                        </ul>
                    </div>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    isAuthenticated: state.user.isAuthenticated,
});
const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
