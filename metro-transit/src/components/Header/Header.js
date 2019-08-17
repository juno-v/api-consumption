import React from 'react';
import "./Header.scss"; 
import CodetLogo from "./Codet.png"

const Header = (props) => {
    return ( 
        <header>
            <div className="wrapper">
                <div className="logo">
                    <img src={CodetLogo} alt="Codet Logo" /> 
                </div>
            </div>
        </header>
        );
}
 
export default Header;