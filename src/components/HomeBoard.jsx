import React from 'react';
import { faHandSpock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../res/logo_empty_bg.png';

export default function HomeBoard() {
    return (
        <div id="tab-home">
            <div>
                <div id="home-top-title">
                    <FontAwesomeIcon icon={faHandSpock} />
                    <h2>Welcome to Locker !</h2>
                </div>
                <p>
                    Locker is a <strong>password manager</strong> because let's be real, remembering <small>“~AHtX8KU@N5(yDp-5fdJpQ”</small> is not easy at all. 
                </p>
                <p>
                    So, Locker's purpose is to keep your precious credentials, as bizarre as they can be, in a warm comfy storage (actually that's not true), so you can see them just by <strong>remembering your key !</strong>
                </p>
            </div>
            <img src={logo} />
        </div>
    )
}
