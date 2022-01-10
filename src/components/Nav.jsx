import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBox, faCheese, faStar } from '@fortawesome/free-solid-svg-icons';
import agartha_logo from '../../res/logo_a_tr_final.png';
import logo from '../../res/logo_empty_bg.png';

export default function Nav({onSelectBoard,t,i18n}) {

    const switchTab = (event) => {
        //console.log(event);
        const parentNavElement = event.nativeEvent.path.filter(node => node.className==='nav_btn')[0];
        if(parentNavElement){
            document.querySelectorAll('.nav_btn').forEach(navBtn => navBtn.classList.remove("_selected"));
            parentNavElement.classList.add("_selected");
            onSelectBoard(parentNavElement.id);
        }
    }

    return (
        <div id="nav">
            <div id="logo-container">
                <img src={logo} />
                <span>
                    <h2>Locker</h2>
                    <h3>{t("nav.title.undertitle")}</h3>
                </span>
            </div>
            <hr />
            <ul id="menu">
                <li id="Home" className="nav_btn _selected" onClick={(e) => switchTab(e)} ><FontAwesomeIcon icon={faHome}/><p>{t("nav.menu.home")}</p></li>
                <li id="Lockers" className="nav_btn" onClick={(e) => switchTab(e)} ><FontAwesomeIcon icon={faBox}/><p>{t("nav.menu.lockers")}</p></li>
            </ul>
            <div id="languages">
                <button id="btn-en" onClick={() => i18n.changeLanguage('en') }>English <FontAwesomeIcon icon={faStar} /></button>
                <button id="btn-fr" onClick={() => i18n.changeLanguage('fr') }>Français <FontAwesomeIcon icon={faCheese} /></button>
            </div>
            <div id="footer">
                <p>{t("nav.footer.text")}</p>
                <div id="agartha-logo-container">
                    <img src={agartha_logo} />
                </div>
            </div>
        </div>
    );
}