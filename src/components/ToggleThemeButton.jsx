import {Button} from 'antd';
import {HiOutlineSun, HiOutlineMoon} from 'react-icons/hi';
import "../css/Header.css";

/**
 * The button to toggle dark theme on and off
 *
 * @component
 * @param {boolean} darkTheme Changes the appearance of the toggle button itself
 * @function toggleTheme Changes between dark and light theme upon a click of the button (changes state)
 * @returns {JSX.Element} The rendered DataDisplay component.
 *
 */
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