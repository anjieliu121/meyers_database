import React from 'react'
import {Menu} from "antd";
import {HomeOutlined, SettingOutlined, BarsOutlined} from '@ant-design/icons';
import "../css/MenuList.css";
import {Link} from "react-router-dom";

const MenuList = ({darkTheme}) => {
    return (
        <Menu theme={darkTheme ? 'dark' : 'light'} mode="inline" className="menu-bar" defaultSelectedKeys={["home"]} openKeys={"covid19"}>
            <Menu.Item key="home" icon={<HomeOutlined/>}>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.SubMenu key="covid19" icon={<BarsOutlined/>} title="COVID-19">
                <Menu.Item key="data0000">
                    <Link to="/covid19/data0000">Data 0000</Link>
                </Menu.Item>
                <Menu.Item key="data0001">
                    <Link to="/covid19/data0001">Data 0001</Link>
                </Menu.Item>
                <Menu.Item key="data0002">
                   <Link to="/covid19/data0002">Data 0002</Link>
                </Menu.Item>
                <Menu.Item key="data0003">
                    <Link to="/covid19/data0003">Data 0003</Link>
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="rsv" icon={<BarsOutlined/>} title="RSV">

            </Menu.SubMenu>
            <Menu.SubMenu key="birdflu" icon={<BarsOutlined/>} title="Bird Flu">

            </Menu.SubMenu>

            <Menu.Item key="upload" icon={<SettingOutlined/>} danger={true}>
                <Link to="/upload">Upload</Link>
            </Menu.Item>
        </Menu>
    )
}

export default MenuList