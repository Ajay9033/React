import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);
        let token = localStorage.getItem('token')
        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            loggedIn,
            isOpen: false
        };
    }
    logOutHandler = (e) => {
        localStorage.removeItem('token');
        window.location.reload(true);
        return <Redirect to="/" />
    }
    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

    render() {
        const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">React</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>

                            <ul className="navbar-nav flex-grow">
                                {this.state.loggedIn ?
                                    <React.Fragment>
                                        <div className="dropdown" onClick={this.toggleOpen}>
                                            <NavLink
                                                tag={Link}
                                                className=" dropdown-toggle"
                                                id="dropdownMenuButton"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                            >
                                                Profile
                                        </NavLink>
                                            <div className={menuClass} aria-labelledby="dropdownMenuButton">
                                                <NavLink tag={Link} className="color mr-3" to="/myprofile">My account</NavLink>
                                                <NavLink tag={Link} className="color" to="/home">All User</NavLink>
                                            </div>
                                        </div>
                                        <NavLink tag={Link} className='nav-link mr-3 ' to='/aboutus'>About Us</NavLink>

                                        <NavLink tag={Link} className='nav-link' onClick={this.logOutHandler} > Logout</NavLink>
                                </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <NavLink tag={Link} className='nav-link' to='/'>Login</NavLink>
                                        <NavLink tag={Link} className='nav-link' to='/register'>Sign up</NavLink>
                                        <NavLink tag={Link} className='nav-link mr-3 ' to='/aboutus'>About Us</NavLink>

                                    </React.Fragment>
                                }
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
