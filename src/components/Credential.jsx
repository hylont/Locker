import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react/cjs/react.development';

export default function Credential({ credential, toggleCredential }) {
    const [hidden, setHidden] = useState(true);
    const pwdContainer = useRef(null);
    const idContainer = useRef(null);

    const onPwdHover = (isHovering) => {
        isHovering ? pwdContainer.current.type = "text" : pwdContainer.current.type = "password";
    }

    function handleChange() {
        toggleCredential(credential.uuid,idContainer.current.value,pwdContainer.current.value);
    }

    const color = Math.floor(((credential.service.charCodeAt(0)-97)*(255*3))/26);


    return (
        <div className="credential">
            <h1 className='credential_letter' style={{color:`rgb(
                ${color <= 255 ? color : 0},
                ${color > 255 && color <=510 ? color-255 : 0},
                ${color > 510 ? color-510 : 0},
                1)`}}
                >{credential.service[0].toUpperCase()}</h1>
            <div className="credential_infos">
                <div className="credential_container_top">
                    <h2>{credential.service}</h2>
                    <FontAwesomeIcon icon={hidden ? faEyeSlash : faEye} onClick={() => setHidden(!hidden)} />
                </div>

                <div className="credential_container cc_bot_cell_1">
                    {!hidden &&
                        <div className="cc_bot_cell">
                            <label>Login :</label>
                            <input type="text" className="id" value={credential.id} ref={idContainer} onChange={handleChange}></input>
                        </div>
                    }
                </div>
                <div className="credential_container cc_bot_cell_2">
                    {!hidden &&
                        <div className="cc_bot_cell ">
                            <label>Password :</label>
                            <input type="password" className="pwd" value={credential.pwd} ref={pwdContainer} onChange={handleChange} onMouseEnter={() => onPwdHover(true)} onMouseOut={() => onPwdHover(false)}></input>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
