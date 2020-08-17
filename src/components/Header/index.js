import React, { useState } from "react";
import "./style.css";
import { Button, Collapse, Nav, Navbar, NavbarToggler } from "shards-react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../redux/user/actions";

const Header = () => {
    const [collapseOpen, setCollapseOpen] = useState(false);
    const [openAccountMenu, setOpenAccountMenu] = useState(false);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch();
    const signOutReq = () => {
        setOpenAccountMenu(false);
        setCollapseOpen(false);
        dispatch(signOut());
    };
    const toggleNavbar = () => {
        const windowWidth = window.innerWidth;

        if (windowWidth < 768) {
            setCollapseOpen(!collapseOpen);
        }
    };
    const toggleAccountMenu = () => {
        setOpenAccountMenu(!openAccountMenu);
    };

    return (
        <Navbar type='light' theme='white' expand='md'>
            <div className='d-flex'>
                <NavbarToggler onClick={toggleNavbar} />
                <NavLink onClick={() => setCollapseOpen(false)} to='/' className='brand text-dark text-decoration-none'>
                    Code Class
                </NavLink>
            </div>

            <Collapse className='justify-content-end bg-white' open={collapseOpen} navbar>
                <Nav navbar>
                    <li className='nav-item d-flex align-items-center justify-content-center'>
                        <NavLink onClick={toggleNavbar} className='nav-link' to='/mentors'>
                            Mentor
                        </NavLink>
                    </li>
                    {isAuthenticated ? (
                        <li className='nav-item d-flex align-items-center justify-content-center'>
                            <NavLink onClick={toggleNavbar} className='nav-link' to='/users/saved-tutorials'>
                                Saved Tutorial
                            </NavLink>
                        </li>
                    ) : null}
                    {isAuthenticated ? null : (
                        <li className='nav-item d-flex justify-content-center'>
                            <NavLink onClick={toggleNavbar} className='nav-link' to='/sign-up'>
                                <Button pill>Đăng ký</Button>
                            </NavLink>
                        </li>
                    )}
                    {isAuthenticated ? null : (
                        <li className='nav-item d-flex justify-content-center'>
                            <NavLink onClick={toggleNavbar} className='nav-link' to='/sign-in'>
                                <Button pill outline>
                                    Đăng nhập
                                </Button>
                            </NavLink>
                        </li>
                    )}
                    {isAuthenticated ? (
                        <li className='nav-item d-flex justify-content-center'>
                            <NavLink onClick={signOutReq} className='nav-link' to='/'>
                                <Button pill outline>
                                    Đăng xuất
                                </Button>
                            </NavLink>
                        </li>
                    ) : null}
                </Nav>
            </Collapse>
            {isAuthenticated && <span role='button' onClick={toggleAccountMenu} className='profile-image'></span>}
            {openAccountMenu && isAuthenticated ? (
                <div>
                    <div className='arrow-up'></div>
                    <ul className='account-menu bg-primary'>
                        <li>
                            <Link
                                onClick={toggleAccountMenu}
                                className='text-white text-decoration-none'
                                to='/users/saved-tutorials'
                            >
                                Bài đã lưu
                            </Link>
                        </li>
                        <li className='text-white'>Cập nhật thông tin</li>
                        <li>
                            <Link onClick={signOutReq} className='text-white text-decoration-none' to='/'>
                                Đăng xuất
                            </Link>
                        </li>
                    </ul>
                </div>
            ) : null}
        </Navbar>
    );
};

export default Header;
