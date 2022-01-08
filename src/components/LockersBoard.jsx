import React, { useState, useRef, useEffect } from "react";
import CredentialsList from "./CredentialsList.jsx";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { faKey, faPlus } from "@fortawesome/free-solid-svg-icons";
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
                toast.success("Welcome to your Locker")
                setCredentialsList(storedCredentials);
            }
        } else {
            setLogged(false);
            toast.error("Wrong key");
        }
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

    const createNewLocker = () => {
        const MIN_LENGTH = 8
        if (storageKey.trim() == "" && storageKey.length < MIN_LENGTH) {
            toast.error(`Your key should not be empty and has te be longer than ${MIN_LENGTH - 1} characters`);
            return;
        } else {
            if (localStorage.getItem(storageKey)) {
                toast.error("Your key is already used");
                setStorageKey("");
            } else {
                setLogged(true);
            }
        }
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
                    <form>
                        <label>Service name :</label>
                        <input ref={serviceNameRef} type="text" />
                        <label>Login :</label>
                        <input ref={loginRef} type="text" />
                        <label>Password :</label>
                        <input ref={passwordRef} type="text" />
                        <button onClick={addNewCredential}>Add</button>
                    </form>
                </div>
                :
                <div id="locker-login">
                    <h2>Please type a key and "<strong className="strong_1">Open Locker</strong>" or "<strong className="strong_2">Create a new Locker</strong>" :</h2>
                    <div>
                        <input
                            value={storageKey}
                            type="text"
                            placeholder="my-simple-yet-personnal-key"
                            onChange={(event) => setStorageKey(event.target.value)}
                        ></input>
                        <button id="open-btn" onClick={validateKey}><FontAwesomeIcon icon={faKey} /> Open Locker</button>
                    </div>
                    <button id="new-locker-btn" onClick={createNewLocker}><FontAwesomeIcon icon={faPlus} />Create new Locker </button>
                </div>
            }

        </div>
    )
}
