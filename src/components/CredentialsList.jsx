import React from 'react';
import Credential from './Credential.jsx';

export default function CredentialsList({credentialsList, toggleCredential}) {
    //console.log(credentialsList);
    return (
        //why is the object array so weird ?
        credentialsList.map(credential => {
            return <Credential key={credential.uuid} toggleCredential={toggleCredential} credential={credential}/>
        })
    );
}
