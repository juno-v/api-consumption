import React from 'react';
import "./Header.scss"; 
import CodetLogo from "./Codet.png"

const Header = (props) => {
    return ( 
        <header className="headerComponent" data-test="headerComponent">
            <div className="wrapper" data-test="wrapper">
                <div className="logo" data-test="logo">
                    <img className="logoImg" data-test="logoImg" src={CodetLogo} alt="Codet Logo" /> 
                </div>
            </div>
        </header>
        );
}
 
export default Header;