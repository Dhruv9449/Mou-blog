import { MdHome, MdLogout, MdPostAdd } from "react-icons/md";
import { Link } from "react-router-dom";


function handleLogout() {
    localStorage.clear()
    window.location.href = "/"
    alert("You'll be logged out")
}

function Navdropdrown() {
    return (
        <div className="nav-dropdown" id="nav-dropdown">
            <ul className="drop-down-list">
                <li className="drop-down-item">
                    {localStorage.getItem("name")}
                </li>
                <li className="drop-down-item">
                    <MdHome /> <Link to="/"> Home </Link>
                </li>
                {localStorage.getItem("role") === "admin" ?
                    <li className="drop-down-item">
                        <MdPostAdd /> <Link to="/newpost"> New post </Link>
                    </li>
                    : null}
                <li className="drop-down-item" onClick={handleLogout}>
                    <MdLogout /> Logout
                </li>
            </ul>
        </div>
    );
}

export default Navdropdrown