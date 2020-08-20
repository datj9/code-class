import React, { Component, createRef } from "react";
import "./style.css";
import { Button, Collapse } from "shards-react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../redux/user/actions";
import { getRooms } from "../../redux/mentor/actions";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { collapseOpen: false, accountMenuOpen: false, chatHistoryBoxOpen: false };
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
    toggleHistoryChatBox = () => {
        this.setState({ chatHistoryBoxOpen: !this.state.chatHistoryBoxOpen });
    };
    closeHistoryChatBox = () => {
        this.setState({ chatHistoryBoxOpen: false });
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
        this.props.getRooms();
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClick);
    }
    render() {
        const { currentUser, isAuthenticated, roomsList } = this.props;
        const { collapseOpen, accountMenuOpen, chatHistoryBoxOpen } = this.state;

        const ChatHistoryBox = () => (
            <div className='chat-history position-absolute'>
                {roomsList.map((room) => (
                    <div key={room.id} className='d-flex justify-content-start mb-3'>
                        <div className='img-container rounded-circle'>
                            <img src={room.receiver.profileImageURL} alt='' />
                        </div>
                        <div className='message-and-name d-flex flex-column'>
                            <span className='font-weight-bold name'>{room.receiver.name}</span>
                            <span className='message'>{room.lastestMessage.text}</span>
                        </div>
                    </div>
                ))}
            </div>
        );

        return (
            <div id='header' className='navbar navbar-expand-md navbar-light bg-white'>
                <div className='d-flex'>
                    <button
                        ref={this.navbarTogglerRef}
                        className='navbar-toggler'
                        type='button'
                        onClick={this.toggleNavbar}
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <NavLink onClick={this.closeNavbar} to='/' className='brand text-dark text-decoration-none'>
                        Code Class
                    </NavLink>
                </div>

                <Collapse className='justify-content-end bg-white' open={collapseOpen} navbar>
                    <div ref={this.collapseMenuRef} className='navbar-nav'>
                        <li className='nav-item d-flex align-items-center justify-content-center'>
                            <NavLink onClick={this.closeNavbar} className='nav-link' to='/mentors'>
                                Mentor
                            </NavLink>
                        </li>
                        {isAuthenticated ? (
                            <li className='inbox nav-item align-items-center justify-content-center position-relative'>
                                <span role='button' onClick={this.toggleHistoryChatBox}>
                                    <i className='fas fa-inbox' />
                                </span>
                                {chatHistoryBoxOpen ? <ChatHistoryBox /> : null}
                            </li>
                        ) : null}
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
                    <div className='top-right-icons-wrapper d-flex'>
                        <span className='inbox-small-screen align-self-center mr-3 position-relative'>
                            <span role='button'>
                                <i className='fas fa-inbox' onClick={this.toggleHistoryChatBox} />
                            </span>
                            {chatHistoryBoxOpen ? <ChatHistoryBox /> : null}
                        </span>
                        <span
                            ref={this.accountIconRef}
                            role='button'
                            onClick={this.toggleAccountMenu}
                            className='profile-image'
                        >
                            {currentUser.profileImageURL ? (
                                <img src={currentUser.profileImageURL} alt='profile' />
                            ) : (
                                <span className='name-icon w-100 h-100 d-flex align-items-center justify-content-center rounded-circle bg-primary text-white'>
                                    {currentUser.shortName}
                                </span>
                            )}
                        </span>
                    </div>
                ) : (
                    <>
                        <Link to='/sign-in' className='user-icon text-decoration-none mr-2'>
                            <i className='fas fa-user' />
                        </Link>
                        <div className='btn-wp w-50 justify-content-end position-absolute btn-wp'>
                            <Link to='/sign-in' role='button'>
                                <Button outline>Đăng Nhập</Button>
                            </Link>
                            <Link to='/sign-up' className='mr-2 ml-3'>
                                <Button>Đăng Ký</Button>
                            </Link>
                        </div>
                    </>
                )}
                {accountMenuOpen && isAuthenticated ? (
                    <div ref={this.accountMenuRef}>
                        <ul className='account-menu bg-white'>
                            <li className='name mb-3'>{currentUser.name}</li>
                            <li>
                                <Link
                                    onClick={this.toggleAccountMenu}
                                    className='text-primary text-decoration-none'
                                    to='/users/saved-tutorials'
                                >
                                    Bài đã lưu
                                </Link>
                            </li>
                            <li className='text-primary'>
                                <Link
                                    onClick={this.toggleAccountMenu}
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
    roomsList: state.mentor.roomsList,
});
const mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(signOut()),
    getRooms: () => dispatch(getRooms()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
