import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import CredentialsList from './components/CredentialsList.jsx';
import { v4 as uuidv4 } from 'uuid'
import Nav from './components/Nav.jsx'

const ROOT = document.querySelector('#root');

async function clicked() {
    const RES = await window.locker.doSomething("That's kinda cool");
    console.info(RES);
}

function App() {
    const [key, setKey] = useState("");
    const [credentialsList, setCredentialsList] = useState([]);
    const serviceNameRef = useRef();
    const loginRef = useRef();
    const passwordRef = useRef();

    //let agarthaLogo = document.querySelector('#hidden-images #agartha-logo');

    //loads from local storage
    useEffect(() => {
        if (key) {
            const storedCredentials = JSON.parse(localStorage.getItem(key));
            if (storedCredentials) {
                //key is valid and values exist
                document.querySelector('#board').classList.remove('_inactive');
                document.querySelector('#board').classList.add('_active');
                setCredentialsList(storedCredentials);
            }
        }
    }, [key]);

    //saves into local storage
    useEffect(() => {
        if (key) {
            localStorage.setItem(key, JSON.stringify(credentialsList));
        }
    }, [credentialsList])

    //overwrites a credential
    function toggleCredential(uuid) {
        const newCredentials = [...credentialsList] //need to copy the array else it will overwrites the state
        const credential = newCredentials.find(credential => credential.uuid === uuid);
        console.log(credential);
        setCredentialsList(newCredentials);
    }

    function addNewCredential(event) {
        const SERVICE_VALUE = serviceNameRef.current.value;
        const LOGIN_VALUE = loginRef.current.value;
        const PASSWORD_VALUE = passwordRef.current.value;
        if (SERVICE_VALUE === '' || LOGIN_VALUE === '' || PASSWORD_VALUE === '') return //TODO Open a specific alert dialog box

        setCredentialsList(prevCredential => {
            return [...prevCredential, { uuid: uuidv4(), service: SERVICE_VALUE, id: LOGIN_VALUE, pwd: PASSWORD_VALUE }];
        })
        serviceNameRef.current.value = null;
        loginRef.current.value = null;
        passwordRef.current.value = null;
    }

    return (
        <>
            <Nav />
            <div id="board">
                <div id="tab-accueil" className="_active">

                </div>
                <div id="tab-lockers" className="_inactive">
                    <div id="locker-login" className="_selected">
                        <input
                            value={key} type="text"
                            onChange={(event) => setKey(event.target.value)}
                        ></input>
                    </div>
                    <div id="locker-logged" className="_not_selected">
                        <CredentialsList credentialsList={credentialsList} toggleCredential={toggleCredential} />
                        <hr></hr>
                        <label>Service name :</label>
                        <input ref={serviceNameRef} type="text" /><br></br>
                        <label>Login :</label>
                        <input ref={loginRef} type="text" />
                        <label>Password :</label>
                        <input ref={passwordRef} type="text" /><br></br>
                        <button onClick={addNewCredential}>Add</button>
                    </div>
                </div>
            </div>
        </>
    )
}

ReactDOM.render(
    <div>
        <App />
    </div>
    , ROOT);