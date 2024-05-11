import { FireFilled } from '@ant-design/icons';
import "../css/Logo.css";
import { Image } from "antd";
import React from "react";
const Logo = () => {

    return (
        <div className="logo">
            <div className="logo-icon">
                <Image className="logo-img" src="src/static/MeyersLabLogo.png"/>
            </div>
        </div>
    );
};

export default Logo;