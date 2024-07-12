import React from "react";
import {useState} from "react";
import {Button, Layout, theme, Typography} from "antd";
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons';
import Logo from './components/Logo'
import MenuList from "./components/MenuList.jsx";
import ToggleThemeButton from "./components/ToggleThemeButton.jsx";
//import "./css/App.css"
//import "./css/index.css"
import Home from "./pages/Home.jsx";
import DataDisplay from "./pages/DataDisplay.jsx"
import ShareData from './pages/ShareData.jsx';
import {Routes, Route} from "react-router-dom";



const { Header, Sider, Content } = Layout;
const pageInfo = {
    covid: [
        {
            title: `COVID-19 Reported Patient Impact and Hospital Capacity by State Timeseries`,
            description: `This dataset provides state-aggregated data for hospital utilization in a timeseries format dating back to January 1, 2020. These are derived from reports with facility-level granularity across three main sources: (1) HHS TeleTracking, (2) reporting provided directly to HHS Protect by state/territorial health departments on behalf of their healthcare facilities and (3) National Healthcare Safety Network (before July 15). After Friday September 29th, 2023, as a result of changes in reporting cadence, this dataset will be updated twice a week on Wednesdays and Fridays.`,
            source: `https://healthdata.gov/Hospital/COVID-19-Reported-Patient-Impact-and-Hospital-Capa/g62h-syeh/about_data`,
            streamlitLink: `https://bio-data-dashboard.streamlit.app/COVID-19%20Reported%20Patient%20Impact%20and%20Hospital%20Capacity%20by%20State%20Timeseries`
        },
        {
            title: `COVID-19 Case Surveillance Public Use Data with Geography`,
            description: `This case surveillance public use dataset has 19 elements for all COVID-19 cases shared with CDC and includes demographics, geography (county and state of residence), any exposure history, disease severity indicators and outcomes, and presence of any underlying medical conditions and risk behaviors.`,
            source: `https://data.cdc.gov/Case-Surveillance/COVID-19-Case-Surveillance-Public-Use-Data-with-Ge/n8mc-b4w4/about_data`,
            streamlitLink: `https://bio-data-dashboard.streamlit.app/COVID-19%20Case%20Surveillance%20Public%20Use%20Data%20with%20Geography`
        },
        {
            title: `Cumulative Percentage of Adults 18 Years and Older Vaccinated with the Updated 2023-24 COVID-19 Vaccine`,
            description: `This dataset contains weekly COVID-19 vaccination coverage of adults 18 years and older by demographic characteristics`,
            source: `https://data.cdc.gov/Vaccinations/Cumulative-Percentage-of-Adults-18-Years-and-Older/hm35-qkiu/about_data`,
            streamlitLink: `https://bio-data-dashboard.streamlit.app/Cumulative%20Percentage%20of%20Adults%2018%20Years%20and%20Older%20Vaccinated%20with%20the%20Updated%202023-24%20COVID-19%20Vaccine`
        },
        {
            title: `Cumulative Percentage of Children Ages 6 Months -17 Years Who Are Up to Date with the Updated 2023-24 COVID-19 Vaccine`,
            description: `This dataset contains COVID-19 vaccination coverage among children 6 months to 17 years`,
            source: `https://data.cdc.gov/Child-Vaccinations/Cumulative-Percentage-of-Children-Ages-6-Months-17/yctb-fv7w/about_data`,
            streamlitLink: `https://bio-data-dashboard.streamlit.app/Cumulative%20Percentage%20of%20Children%20Ages%206%20Months%20-17%20Years%20Who%20Are%20Up%20to%20Date%20with%20the%20Updated%202023-24%20COVID-19%20Vaccine`
        },
    ],
    influenza: [
        {
            title: `Age Specific Coverage Flu RD4 2023-24`,
            description: `This dataset contains simulated influenza vaccine coverage data in fall-winter 2023-2024. The data provides weekly cumulative coverages by state and adult and child age groups. Estimates are based on the reported coverage of the flu vaccine in the 2021-2022 fall season by month, state, and age. We used a Piecewise Cubic Hermite Interpolating Polynomial to generate weekly coverage estimates from monthly data. Dates have been shifted to reflect projection weeks in the 2023-2024 season. The data in this file can be used as is (no adjustment to coverage should be needed). Age groups can be collapsed based on provided population sizes.`,
            source: `https://github.com/midas-network/flu-scenario-modeling-hub_resources/blob/main/Rd4_datasets/Age_Specific_Coverage_Flu_RD4_2023_24_Sc_A_B_C_D_E_F.csv`,
            streamlitLink: `https://bio-data-dashboard.streamlit.app/Age%20Specific%20Coverage%20Flu%20RD4%202023-24`
        },
    ],
    climate: [
        {
        title: `State Climate Data`,
        description: `This dataset contains various climate metrics of each state over the course of one year.`,
        source: `#`
        },
    ],
}

/**
 * The root App component; defines what to display for each url route
 *
 * @component
 * @returns {JSX.Element} The rendered App
 */
const App = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [dataBlob, setDataBlob] = useState(null);
  const toggleTheme = () => {setDarkTheme(!darkTheme);}
  const {token: {colorBgContainer}} = theme.useToken();
  const { Title } = Typography;

  return (
      <div className="app">
          <Layout>
              <Sider collapsed={collapsed} collapsible trigger={null} theme={darkTheme ? 'dark' : 'light'}
                     className="sidebar">
                  <Logo/>
                  <MenuList
                      darkTheme={darkTheme}
                      dataChanger={setDataBlob}
                  />
                  <ToggleThemeButton
                      darkTheme={darkTheme}
                      toggleTheme={toggleTheme}
                  />
              </Sider>
              <Layout>
                  <Header style={{padding: 0, background: colorBgContainer}} className="header">
                      <Button type='text' className="toggle" onClick={() => setCollapsed(!collapsed)}
                              icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}/>
                  </Header>
                  <Content className="content">
                      <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/covid19' element={<div>COVID-19</div>}></Route>
                        <Route path='/covid19/data0000' element={
                            <DataDisplay 
                                dataBlob={null}
                                pageInfo={pageInfo.covid[0]}
                            />
                        }></Route>

                        <Route path='/covid19/data0001' element={
                            <DataDisplay 
                                dataBlob={null}
                                pageInfo={pageInfo.covid[1]}
                            />
                        }></Route>

                        <Route path='/covid19/data0002' element={
                            <DataDisplay 
                                dataBlob={null}
                                pageInfo={pageInfo.covid[2]}
                            />
                        }></Route>

                        <Route path='/covid19/data0003' element={
                            <DataDisplay 
                                dataBlob={null}
                                pageInfo={pageInfo.covid[3]}
                            />
                        }></Route>

                        <Route path='/influenza/data0004' element={
                            <DataDisplay 
                                dataBlob={null}
                                pageInfo={pageInfo.influenza[0]}
                            />
                        }></Route>

                        <Route path='/influenza/data0005' element={
                            <DataDisplay 
                                dataBlob={dataBlob}
                                pageInfo={pageInfo.climate[0]}
                            />
                        }></Route>

                        
                        <Route path='/sharedata' element={<ShareData />}></Route>
                      </Routes>
                  </Content>
              </Layout>
          </Layout>
      </div>
  )
}


export default App
