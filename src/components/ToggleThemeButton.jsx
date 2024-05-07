import {Button} from 'antd';
import {HiOutlineSun, HiOutlineMoon} from 'react-icons/hi';
import "../css/Header.css";

const ToggleThemeButton = ({darkTheme, toggleTheme}) => {
    return(
        <div className="toggle-theme-btn">
            <Button onClick={toggleTheme}>
                {darkTheme ? <HiOutlineSun/> : <HiOutlineMoon/>}
            </Button>
        </div>
    );
};

export default ToggleThemeButton