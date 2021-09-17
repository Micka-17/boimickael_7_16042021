import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import '../styles/Header.css'
import header from "../Groupomania_Logos/icon-left-font.png"
import Cookies from 'js-cookie'
import { Link, useHistory } from "react-router-dom";

export function Post() {

    const history = useHistory();
    const SubmitLogout = async function (e) {
        e.preventDefault()

        Cookies.get('token');
        Cookies.remove('token');
    }


    const SubmitAccount = function (e) {
        e.preventDefault()
        // Quelque chose
    }
    return (
        <div className="headers">
            <div className="d-flex justify-content-between m-5">
                <div className="h1 center dflex">
                    <img className="header" src={header} height={350} width={350} alt="logoGroupomania" />
                </div>
                <div className="iconRight m-5">
                    <ul className="nav">
                        <Link to="/Account">
                            <li className="nav1">
                                <button type="submit" value="LOGOUT" onClick={SubmitAccount}>
                                    <FontAwesomeIcon className="iconUser" icon={faUserCircle} />
                                </button>
                            </li>
                            </Link>
                            <Link to="/">
                            <li className="nav2" onClick={ SubmitLogout }>
                                <button type="submit" 
                                value="LOGOUT" 
                                onClick={() => history.push('/')}
                                >
                                    <FontAwesomeIcon className="iconUser" icon={faSignOutAlt} />
                                </button>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}
