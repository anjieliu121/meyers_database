import React, {useState} from 'react'
import {Menu} from "antd";
import {HomeOutlined, SettingOutlined, BarsOutlined, NodeIndexOutlined} from '@ant-design/icons';
import "../css/MenuList.css";
import {Link} from "react-router-dom";

const MenuList = ({darkTheme, dataChanger}) => {
    function getData() {
        fetch("/data?blobname=raw%2Fstate_climate_data.csv", {
          method: "GET"
        })
        .then(res => res.json()).then((data) => {
          dataChanger({
            dataset: "state climate data",
            data: data})
          console.log(data)
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
    })}
    const href = window.location.href.split('/');
    const currentTab = (href[href.length - 1] === '') ? 'home' : href[href.length - 1];
    //TODO: change the defaultOpenKeys to the Menu.SubMenu that has the current tab opened
    //https://stackoverflow.com/questions/67514909/how-to-open-close-antd-submenu-programatically
    console.log(href)
    return (
        <Menu theme={darkTheme ? 'dark' : 'light'} mode="inline" className="menu-bar" defaultSelectedKeys={[currentTab]} defaultOpenKeys={['covid19']}>
            <Menu.Item key="home" icon={<HomeOutlined/>}>
                <Link to="/">Home</Link>
            </Menu.Item>

            <Menu.SubMenu key="covid19" icon={<NodeIndexOutlined />} title="COVID-19">
                <Menu.Item key="data0000" onclick={getData}>
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

            <Menu.SubMenu key="rsv" icon={<NodeIndexOutlined />} title="RSV">

            </Menu.SubMenu>

            <Menu.SubMenu key="birdflu" icon={<NodeIndexOutlined />} title="Bird Flu">

            </Menu.SubMenu>

            <Menu.Item key="sharedata" icon={<SettingOutlined/>} danger={true}>
                <Link to="/sharedata">Share Data</Link>
            </Menu.Item>
        </Menu>
    )
}

export default MenuList