import React from 'react'
import { Manager } from '../Manager'

export default function Credential({credential, toggleCredential}) {
    function handleChange(){
        toggleCredential(credential.uuid);
    }
    return (
        <div className="credential" id={credential.service}>
            <label>Login :</label>
            <input type="text" className="id" value={credential.id} onChange={Manager.updateCredential(this)} onChange={handleChange}></input>
            
            <label>Password :</label>
            <input type="password" className="pwd" value={credential.pwd} onChange={Manager.updateCredential(this)} onChange={handleChange}></input>
        </div>
    )
}
