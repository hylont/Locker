import React, { useState, useRef, useEffect } from "react";
import CredentialsList from "./CredentialsList.jsx";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LockersBoard() {

    const [storageKey, setStorageKey] = useState("");
    const [credentialsList, setCredentialsList] = useState([]);
    const serviceNameRef = useRef();
    const loginRef = useRef();
    const passwordRef = useRef();
    const [logged, setLogged] = useState(false);

    //loads from local storage
    const validateKey = () => {
        if (storageKey) {
            const storedCredentials = JSON.parse(localStorage.getItem(storageKey));
            if (storedCredentials) {
                setLogged(true);
                //storageKey is valid and values exist
                setCredentialsList(storedCredentials);
            }
        } else setLogged(false);
        logged ? toast.success("Valid key") : toast.error("Invalid key");
    }

    //saves into local storage
    useEffect(() => {
        if (storageKey) {
            localStorage.setItem(storageKey, JSON.stringify(credentialsList));
        }
    }, [credentialsList]);

    //overwrites a credential
    function toggleCredential(uuid) {
        const newCredentials = [...credentialsList]; //need to copy the array else it will overwrites the state
        const credential = newCredentials.find(
            (credential) => credential.uuid === uuid
        );
        console.log(credential);
        setCredentialsList(newCredentials);
    }

    function addNewCredential(event) {
        const SERVICE_VALUE = serviceNameRef.current.value;
        const LOGIN_VALUE = loginRef.current.value;
        const PASSWORD_VALUE = passwordRef.current.value;
        if (SERVICE_VALUE === "" || LOGIN_VALUE === "" || PASSWORD_VALUE === "")
            return; //TODO Open a specific alert dialog box

        setCredentialsList((prevCredential) => {
            return [
                ...prevCredential,
                {
                    uuid: uuidv4(),
                    service: SERVICE_VALUE,
                    id: LOGIN_VALUE,
                    pwd: PASSWORD_VALUE,
                },
            ];
        });
        serviceNameRef.current.value = null;
        loginRef.current.value = null;
        passwordRef.current.value = null;
    }
    return (
        <div id="tab-lockers" >
            {logged ?
                <div id="locker-logged">
                    <CredentialsList
                        credentialsList={credentialsList}
                        toggleCredential={toggleCredential}
                    />
                    <hr></hr>
                    <label>Service name :</label>
                    <input ref={serviceNameRef} type="text" />
                    <br></br>
                    <label>Login :</label>
                    <input ref={loginRef} type="text" />
                    <label>Password :</label>
                    <input ref={passwordRef} type="text" />
                    <br></br>
                    <button onClick={addNewCredential}>Add</button>
                </div>
                :
                <div id="locker-login">
                    <input
                        value={storageKey}
                        type="text"
                        onChange={(event) => setStorageKey(event.target.value)}
                    ></input>
                    <button onClick={validateKey}><FontAwesomeIcon icon={faKey} /> Open Locker</button>
                </div>
            }

        </div>
    )
}
