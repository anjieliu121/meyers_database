import {useState} from "react";
import {Button, Layout, theme, Typography} from "antd";
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons';
import Logo from './components/Logo'
import MenuList from "./components/MenuList.jsx";
import ToggleThemeButton from "./components/ToggleThemeButton.jsx";
import "./css/App.css"
import "./css/index.css"
import Home from "./pages/Home.jsx";
import Data0000 from "./pages/Data0000.jsx"
import ShareData from './pages/ShareData.jsx';
import {Routes, Route} from "react-router-dom";



const { Header, Sider, Content } = Layout;
const App = () => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [data0, setData0]=useState({dataset:"Uhh", data:"hii"});
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
                      dataChanger={setData0}
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
                        <Route path='/covid19/data0000' element={<Data0000 info={data0}/>}></Route>
                        <Route path='/covid19/data0001' element={<div>Disabled Users List</div>}></Route>
                        <Route path='/covid19/data0002' element={<div>Profile</div>}></Route>
                        <Route path='/covid19/data0003' element={<div>hi</div>}></Route>
                        <Route path='/sharedata' element={<ShareData />}></Route>
                      </Routes>
                  </Content>
              </Layout>
          </Layout>
      </div>

  )
}


export default App
