import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBox } from '@fortawesome/free-solid-svg-icons';
import agartha_logo from '../../res/logo_a_tr_final.png';
import logo from '../../res/logo_empty_bg.png';

const displayNav = (node) => {

}

export default function Nav() {
    return (
        <div id="nav">
            <div id="logo-container">
                <img src={logo} />
                <span>
                    <h2>Locker</h2>
                    <h3>Remember what's important</h3>
                </span>
            </div>
            <hr></hr>
            <ul id="menu">
                <li className="_selected" onClick={displayNav("accueil")} ><FontAwesomeIcon icon={faHome}/><p>Accueil</p></li>
                <li onClick={displayNav("lockers")} ><FontAwesomeIcon icon={faBox}/><p>Lockers</p></li>
            </ul>
            <div id="footer">
                <p>Fait avec ❤ par Agartha Développement</p>
                <div id="agartha-logo-container">
                    <img src={agartha_logo} />
                </div>
            </div>
        </div>
    );
}
