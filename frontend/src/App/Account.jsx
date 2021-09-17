import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import '../styles/Header.css'
import header from "../Groupomania_Logos/icon-left-font.png"
import Cookies from 'js-cookie'

export function Account() {

    const SubmitLogout = function (e) {
        e.preventDefault()
        Cookies.get('token');
        Cookies.remove('token');
    }
return(
    <div className="headers">
        <div className="d-flex justify-content-between m-5">
            <div className="h1 center dflex">
            <img className="header" src={header} height={350} width={350} alt="logoGroupomania"/>
        </div>
                <div className="iconRight">
                    <a href="/" className="iconUser m-5"><FontAwesomeIcon icon={faUserCircle} /></a>
                    <button type="submit" value="LOGOUT" onClick={SubmitLogout}><FontAwesomeIcon className="iconUser" icon={faSignOutAlt} /></button>
                </div>
        </div>
    </div>
)}
