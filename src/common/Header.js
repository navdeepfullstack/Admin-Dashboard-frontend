import React from "react";
import { Dropdown } from 'react-bootstrap';
import './common.css'
const Header = () => {
    const addClass = () => {
        document.getElementById("togglesidebar").classList.add('active_sidebar')
    }
    return (
        <>
            <header className="d-flex align-items-center">
                <button className="btn sidebar_btn d-inline-flex align-items-center justify-content-center d-xxl-none d-xl-none" onClick={addClass}>
                    <img src={require('../assets/images/dashboard.svg').default} alt="dashboard" />
                </button>
                <div className="text-end">
                    <Dropdown className="position-relative">
                        <Dropdown.Toggle variant="unset" id="dropdown-basic" className="border-0">
                            <i className="fa fa-bell"></i>
                            <span></span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </header>
        </>
    )
}
export default Header;