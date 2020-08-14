import React, { useState } from "react";
import "./style.css";
import { Button, Collapse, Container, Nav, Navbar, NavbarToggler } from "shards-react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../redux/user/actions";

const Header = () => {
    const [collapseOpen, setCollapseOpen] = useState(false);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch();
    const signOutReq = () => {
        toggleNavbar();
        dispatch(signOut());
    };
    const toggleNavbar = () => {
        const windowWidth = window.innerWidth;

        if (windowWidth < 768) {
            setCollapseOpen(!collapseOpen);
        }
    };

    return (
        <Navbar type='light' theme='white' expand='md'>
            <Container fluid className='bg-white'>
                <NavLink onClick={() => setCollapseOpen(false)} to='/' className='brand text-dark text-decoration-none'>
                    Code Class
                </NavLink>
                <NavbarToggler onClick={toggleNavbar} />
                <Collapse className='justify-content-end bg-white' open={collapseOpen} navbar>
                    <Nav navbar>
                        <li className='nav-item d-flex align-items-center justify-content-center'>
                            <NavLink onClick={toggleNavbar} className='nav-link' to='/'>
                                Bài hướng dẫn
                            </NavLink>
                        </li>
                        {isAuthenticated ? (
                            <li className='nav-item d-flex align-items-center justify-content-center'>
                                <NavLink onClick={toggleNavbar} className='nav-link' to='/users/saved-tutorials'>
                                    Bài viết đã lưu
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
            </Container>
        </Navbar>
        // <nav className='navbar navbar-expand-md navbar-light bg-white'>
        //     <div className='container'>
        //         <NavLink to='/' className='brand text-dark text-decoration-none'>
        //             Code Class
        //         </NavLink>
        //         <button onClick={() => setCollapse(!collapse)} type='button' className='navbar-toggler'>
        //             <span className='navbar-toggler-icon'></span>
        //         </button>
        //         <div className={`${collapse && "show"} collapse navbar-collapse justify-content-end bg-white`}>
        //             <ul className='navbar-nav '>
        //                 <li onClick={closeNav} className='nav-item d-flex align-items-center justify-content-center'>
        //                     <NavLink className='nav-link' to='/'>
        //                         Bài hướng dẫn
        //                     </NavLink>
        //                 </li>
        //                 {isAuthenticated ? (
        //                     <li
        //                         onClick={closeNav}
        //                         className='nav-item d-flex align-items-center justify-content-center'
        //                     >
        //                         <NavLink className='nav-link' to='/users/saved-tutorials'>
        //                             Bài viết đã lưu
        //                         </NavLink>
        //                     </li>
        //                 ) : null}
        //                 {isAuthenticated ? null : (
        //                     <li onClick={closeNav} className='nav-item d-flex justify-content-center'>
        //                         <NavLink className='nav-link' to='/sign-up'>
        //                             <Button pill>Đăng ký</Button>
        //                         </NavLink>
        //                     </li>
        //                 )}
        //                 {isAuthenticated ? null : (
        //                     <li onClick={closeNav} className='nav-item d-flex justify-content-center'>
        //                         <NavLink className='nav-link' to='/sign-in'>
        //                             <Button pill outline>
        //                                 Đăng nhập
        //                             </Button>
        //                         </NavLink>
        //                     </li>
        //                 )}
        //                 {isAuthenticated ? (
        //                     <li onClick={closeNav} className='nav-item d-flex justify-content-center'>
        //                         <NavLink onClick={signOutReq} className='nav-link' to='/'>
        //                             <Button pill outline>
        //                                 Đăng xuất
        //                             </Button>
        //                         </NavLink>
        //                     </li>
        //                 ) : null}
        //             </ul>
        //         </div>
        //     </div>
        // </nav>
    );
};

export default Header;
