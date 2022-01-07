import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBox } from '@fortawesome/free-solid-svg-icons';
import agartha_logo from '../../res/logo_a_tr_final.png';
import logo from '../../res/logo_empty_bg.png';

export default function Nav({onSelectBoard}) {

    const switchTab = (event) => {
        //console.log(event);
        const parentNavElement = event.nativeEvent.path.filter(node => node.className==='nav_btn')[0];
        onSelectBoard(parentNavElement.id);
    }

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
                <li id="Home" className="nav_btn" onClick={(e) => switchTab(e)} ><FontAwesomeIcon icon={faHome}/><p>Home</p></li>
                <li id="Lockers" className="nav_btn" onClick={(e) => switchTab(e)} ><FontAwesomeIcon icon={faBox}/><p>Lockers</p></li>
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
