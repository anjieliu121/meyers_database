import React, {useState} from 'react'
import {Menu} from "antd";
import {HomeOutlined, SettingOutlined, NodeIndexOutlined} from '@ant-design/icons';
import "../css/MenuList.css";
import {Link} from "react-router-dom";

const MenuList = ({darkTheme, dataChanger}) => {

    const href = window.location.href.split('/');
    const currentTab = (href[href.length - 1] === '') ? 'home' : href[href.length - 1];
    //const currentTab = 'home';
    //TODO: change the defaultOpenKeys to the Menu.SubMenu that has the current tab opened
    //https://stackoverflow.com/questions/67514909/how-to-open-close-antd-submenu-programatically
    //console.log(href)

    // Returns ture only if HTTP status code is in 200 range
    const check_HTTP_status = (response) => {
        console.log("Checking HTTP code status")
        if (response.ok) {
            console.log('Promise resolved and is successful!');
            console.log(response.status)
          } else {
            console.log("Oh nose resolved but unsuccessful")
            console.log(response.status)
            // Custom message for failed HTTP codes
            if (response.status === 404) throw new Error('404, Not found');
            if (response.status === 500) throw new Error('500, internal server error');

            // For any other server error
            throw new Error(response.status);
        }
    }

    //fetch data from Flask server with an api call to /data?blobname=value
    const getData = async (e) => {
        console.log("Getting data from Google Cloud")
        try {
            const response = await fetch("http://127.0.0.1:5000/data?blobname=raw%2Fstate_climate_data.csv", {
                    "Accept" : "application/json"
            });
            check_HTTP_status(response)
            console.log(response)
            console.log("Onto json()...")
            console.log(response.headers.get('Content-Type'))
            const content = await response.json()

            console.log(content)
            console.log("Trying to change the data...")
            dataChanger({
                name: "State climate data",
                content: content
            })
        } catch (error) {
            // Output e.g.: "Fetch Error: 404, Not found"
            console.error('Fetch', error);
        }
    }


    return (
        <Menu theme={darkTheme ? 'dark' : 'light'} mode="inline" className="menu-bar" defaultSelectedKeys={[currentTab]} defaultOpenKeys={['covid19']}>
            <Menu.Item key="home" icon={<HomeOutlined/>}>
                <Link to="/">Home</Link>
            </Menu.Item>

            <Menu.SubMenu key="covid19" icon={<NodeIndexOutlined />} title="COVID-19">
                <Menu.Item key="data0000">
                    <Link to="/covid19/data0000">Reported Patient Impact and Hospital Capacity by State Timeseries</Link>
                </Menu.Item>
                <Menu.Item key="data0001">
                    <Link to="/covid19/data0001">Case Surveillance Public Use Data with Geography</Link>
                </Menu.Item>
                <Menu.Item key="data0002">
                   <Link to="/covid19/data0002">Cumulative Percentage of Adults 18 Years and Older Vaccinated with the Updated 2023-24 COVID-19 Vaccine</Link>
                </Menu.Item>
                <Menu.Item key="data0003">
                    <Link to="/covid19/data0003">Cumulative Percentage of Children Ages 6 Months -17 Years Who Are Up to Date with the Updated 2023-24 COVID-19 Vaccine</Link>
                </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu key="influenza" icon={<NodeIndexOutlined />} title="Influenza">
                <Menu.Item key="data0004" >
                    <Link to="/influenza/data0004">Age Specific Coverage Flu RD4 2023-24</Link>
                </Menu.Item>
                <Menu.Item key="data0005" onClick={getData}>
                    <Link to="/influenza/data0005">Data 0005</Link>
                </Menu.Item>
                <Menu.Item key="data0006">
                   <Link to="/influenza/data0006">Data 0006</Link>
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
