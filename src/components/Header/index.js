import React, { useState } from "react";
import "./style.css";
import { Button } from "shards-react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../redux/user/actions";

const Header = (props) => {
    const [collapse, setCollapse] = useState(false);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const signOutReq = () => {
        dispatch(signOut());
    };
    const closeNav = () => {
        setCollapse(false);
    };

    return (
        <nav className='navbar navbar-expand-md navbar-light bg-white'>
            <div className='container'>
                <NavLink to='/' className='brand text-dark text-decoration-none'>
                    Code Class
                </NavLink>
                <button onClick={() => setCollapse(!collapse)} type='button' className='navbar-toggler'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className={`${collapse && "show"} collapse navbar-collapse justify-content-end bg-white`}>
                    <ul className='navbar-nav '>
                        <li onClick={closeNav} className='nav-item d-flex align-items-center justify-content-center'>
                            <NavLink className='nav-link' to='/'>
                                Bài hướng dẫn
                            </NavLink>
                        </li>
                        {isAuthenticated ? (
                            <li
                                onClick={closeNav}
                                className='nav-item d-flex align-items-center justify-content-center'
                            >
                                <NavLink className='nav-link' to='/users/saved-tutorials'>
                                    Bài viết đã lưu
                                </NavLink>
                            </li>
                        ) : null}
                        {isAuthenticated ? null : (
                            <li onClick={closeNav} className='nav-item d-flex justify-content-center'>
                                <NavLink className='nav-link' to='/sign-up'>
                                    <Button pill>Đăng ký</Button>
                                </NavLink>
                            </li>
                        )}
                        {isAuthenticated ? null : (
                            <li onClick={closeNav} className='nav-item d-flex justify-content-center'>
                                <NavLink className='nav-link' to='/sign-in'>
                                    <Button pill outline>
                                        Đăng nhập
                                    </Button>
                                </NavLink>
                            </li>
                        )}
                        {isAuthenticated ? (
                            <li onClick={closeNav} className='nav-item d-flex justify-content-center'>
                                <NavLink onClick={signOutReq} className='nav-link' to='/'>
                                    <Button pill outline>
                                        Đăng xuất
                                    </Button>
                                </NavLink>
                            </li>
                        ) : null}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
