import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons'
import '../styles/Header.css'
import header from "../Groupomania_Logos/icon-left-font.png"
import { Link, useHistory } from "react-router-dom";
import "../styles/Cards.css";
import food from "../img/food.jpg";
import Card from './Card';



export function Post(props) {

    const recipeAuthor = "Mickey";
    const recipeItem = {
        title: "Tacos a l'avocat",
        date: "La date du jour",
        image: food,
        description:
            "Ceci test la partie description de la card ",
    };

    const like = 193;
    const isLiked = true;

    const history = useHistory();
    const SubmitLogout = async function (e) {
        e.preventDefault()

        localStorage.getItem('token');
    }


    const SubmitAccount = function (e) {
        e.preventDefault()

    }
    return (
        <div>
            <div className="headers">
                <div className="d-flex justify-content-between m-5">
                    <div className="h1 center dflex">
                        <img className="header" src={header} height={350} width={350} alt="logoGroupomania" />
                    </div>
                    <div className="iconRight m-5">
                        <ul className="nav">
                        <Link to="/post">
                                <li className="nav0">
                                    <button type="submit"
                                        value="post"
                                        onClick={() => history.push('/post')}
                                    >
                                        <FontAwesomeIcon className="iconUser" icon={faHome} />
                                    </button>
                                </li>
                            </Link>
                            <Link to="/Account">
                                <li className="nav1" onClick={SubmitAccount}>
                                    <button type="submit" value="ACCOUNT" onClick={() => history.push('/account')} >
                                        <FontAwesomeIcon className="iconUser" icon={faUserCircle} />
                                    </button>
                                </li>
                            </Link>
                            <Link to="/main">
                                <li className="nav2" onClick={SubmitLogout}>
                                    <button type="submit"
                                        value="LOGOUT"
                                        onClick={() => history.push('/main')}
                                    >
                                        <FontAwesomeIcon className="iconUser" icon={faSignOutAlt} />
                                    </button>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="App">
                <header className="App-header">
                    <Card
                        author={recipeAuthor}
                        title={recipeItem.title}
                        date={recipeItem.date}
                        description={recipeItem.description}
                        liked={isLiked}
                        likeCount={like}
                    />
                </header>
            </div>
        </div>
    )
}