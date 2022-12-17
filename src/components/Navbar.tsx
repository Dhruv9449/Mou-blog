import Logosvg from "./Logosvg";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { FaMoon, FaSun, FaCloudMoon } from "react-icons/fa";
import { useEffect, useState } from "react";
import GoogleLogin from "./Login";
import Navdropdrown from "./Navdropdown";

function Navbar() {
  const navElements = [""];

  let element = document.getElementById("app");

  const [themeButton, setThemeButton] = useState(<FaMoon id="theme-button" />);

  function changeThemeButton() {
    if (element?.classList.contains("theme-light")) {
      setThemeButton(<FaSun id="theme-button" />);
    } else if (element?.classList.contains("theme-extradark")) {
      setThemeButton(<FaCloudMoon id="theme-button" />);
    }
    else if (element?.classList.contains("theme")) {
      setThemeButton(<FaMoon id="theme-button" />);
    }
  }

  useEffect(() => {
    changeThemeButton();
  }, [element?.classList]);

  function changeTheme() {
    element = document.getElementById("app");
    if (element!.classList.contains("theme")) {
      element!.classList.remove("theme")
      element!.classList.add("theme-light")
      changeThemeButton()
    }
    else if (element!.classList.contains("theme-extradark")) {
      element!.classList.remove("theme-extradark")
      element!.classList.add("theme")
      changeThemeButton()
    }
    else if (element?.classList.contains("theme-light")) {
      element.classList.remove("theme-light")
      element.classList.add("theme-extradark")
      changeThemeButton()
    }
  }

  const [dropDown, setDropDown] = useState(false);

  function showDropdown() {
    setDropDown(!dropDown);
  }

  return (
    <div>
      <div className="nav">
        <Link to="/">
          <Logosvg name="logo" />
        </Link>

        <ul className="navbar">
          {navElements.map(element => (
            <li className="nav-ele">
              <a href={"#" + element.toLowerCase()} className="navlink">{element}</a>
            </li>
          ))}
          <li className="nav-ele">
            {localStorage.getItem("role") ?
              <div className="user-dropdown">
                <img src={localStorage.getItem("picture")!} alt="pfp" className="profile-pic" referrerPolicy="no-referrer"
                  onClick={showDropdown} id="profile-pic" />
                {dropDown ? <Navdropdrown /> : null}
              </div>
              :
              <GoogleLogin type="icon" shape="pill" />}
          </li>

          <li className="nav-ele">
            <span className="theme-button" id="theme-button-span" onClick={changeTheme}>
              {themeButton}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;