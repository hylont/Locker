import React, { useState, useRef, useEffect } from "react";
import CredentialsList from "./CredentialsList.jsx";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { faKey, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Trans } from "react-i18next";

export default function LockersBoard({ t }) {

    const [storageKey, setStorageKey] = useState("");
    const [credentialsList, setCredentialsList] = useState([]);
    const serviceNameRef = useRef();
    const loginRef = useRef();
    const passwordRef = useRef();
    const [logged, setLogged] = useState(false);

    //loads from local storage
    const validateKey = () => {
        if (storageKey !== '') {
            const storedCredentials = JSON.parse(localStorage.getItem(storageKey));
            if (storedCredentials) {
                setLogged(true);
                //storageKey is valid and values exist
                toast.success(t("board.lockers.login.toasts.correct"));
                setCredentialsList(storedCredentials);
            } else {
                setLogged(false);
                toast.error(t("board.lockers.login.toasts.incorrect"));
            }
        }
    }

    //overwrites a credential
    function toggleCredential(uuid, id, pwd) {
        let newCredentials = [...credentialsList]; //need to copy the array else it will overwrites the state
        let existingCredential = newCredentials.find((credential) => credential.uuid === uuid);
        let newCredential = { ...existingCredential, id: id, pwd: pwd };
        newCredentials = newCredentials.map(credential => credential.uuid === uuid ? newCredential : credential);
        setCredentialsList(newCredentials);
    }

    const createNewLocker = () => {
        const MIN_LENGTH = 8
        if (storageKey.trim() == "" && storageKey.length < MIN_LENGTH) {
            toast.error(t("board.lockers.login.toasts.invalid", { minLength: MIN_LENGTH - 1 }));
            return;
        } else {
            if (localStorage.getItem(storageKey)) {
                toast.error(t("board.lockers.login.toasts.used"));
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
        if (SERVICE_VALUE.trim() === "" || LOGIN_VALUE.trim() === "" || PASSWORD_VALUE.trim() === "") {
            toast.error(t("board.lockers.login.toasts.empty"));
            return;
        }
        setCredentialsList(prevCredentials => {
            return [...prevCredentials,
            {
                uuid: uuidv4(),
                service: SERVICE_VALUE,
                id: LOGIN_VALUE,
                pwd: PASSWORD_VALUE
            }
            ];
        });
        serviceNameRef.current.value = null;
        loginRef.current.value = null;
        passwordRef.current.value = null;
    }

    //saves into local storage
    useEffect(() => {
        if (storageKey !== '') {
            localStorage.setItem(storageKey, JSON.stringify(credentialsList));
        }

    }, [credentialsList]);

    return (
        <div id="tab-lockers" >
            {logged ?
                <div id="locker-logged">
                    <h1>{credentialsList.length > 0 ? t("board.lockers.logged.title") : t("board.lockers.logged.title.empty")}</h1>
                    <CredentialsList
                        credentialsList={credentialsList}
                        toggleCredential={toggleCredential}
                        t={t}
                    />
                    <div id="form">
                        <label>{t("board.lockers.logged.form.service_label")}</label>
                        <input ref={serviceNameRef} type="text" />
                        <label>{t("board.lockers.logged.form.login_label")}</label>
                        <input ref={loginRef} type="text" />
                        <label>{t("board.lockers.logged.form.password_label")}</label>
                        <input ref={passwordRef} type="text" />
                        <button onClick={addNewCredential}>{t("board.lockers.logged.form.add_button")}</button>
                    </div>
                </div>
                :
                <div id="locker-login">
                    <h2><Trans>{t("board.lockers.login.welcomer")}</Trans></h2>
                    <div>
                        <input
                            value={storageKey}
                            type="text"
                            placeholder={t("board.lockers.login.key_placeholder")}
                            onChange={(event) => setStorageKey(event.target.value)}
                        ></input>
                        <button id="open-btn" onClick={validateKey}><FontAwesomeIcon icon={faKey} />{t("board.lockers.login.button_open")}</button>
                    </div>
                    <button id="new-locker-btn" onClick={createNewLocker}><FontAwesomeIcon icon={faPlus} />{t("board.lockers.login.button_new")}</button>
                </div>
            }

        </div>
    )
}
