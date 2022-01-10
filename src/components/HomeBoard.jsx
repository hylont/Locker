import React from 'react';
import { faHandSpock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../res/logo_empty_bg.png';
import { Trans } from 'react-i18next';

export default function HomeBoard({ t }) {
    return (
        <div id="tab-home">
            <div>
                <div id="home-top-title">
                    <FontAwesomeIcon icon={faHandSpock} />
                    <h2>{t("board.home.welcomer")}</h2>
                </div>
                <p>
                    <Trans>{t("board.home.p1")}</Trans>
                </p>
                <p>
                    <Trans>{t("board.home.p2")}</Trans>
                </p>
            </div>
            <img src={logo} />
        </div>
    )              
}