import { FireFilled } from '@ant-design/icons';
import "../css/Logo.css";
import { Image } from "antd";
import React from "react";
import logo from "./MeyersLabLogo.png"

/**
 * The logo for the Meyers Database
 *
 * @component
 * @returns {JSX.Element} The rendered Logo component
 *
 */
const Logo = () => {

    return (
        <div className="logo">
            <div className="logo-icon">
                <Image className="logo-img" src={logo}/>
            </div>
        </div>
    );
};

export default Logo;