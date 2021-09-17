import { React } from "react"
import Axios from 'axios'
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom"


export function LoginForm() {

    const history = useHistory();

    const SubmitLogin = async function (e) {
        e.preventDefault()

        const data = {
            email: document.querySelector('input.email').value,
            password: document.querySelector('input.password').value
        }

        try {
            await Axios.post("http://localhost:3000/api/auth/login",
                {
                    email: data.email,
                    password: data.password,
                }).then(function (ReloadPage) {
                    history.push("/post");
                    document.location.reload();
                })
            Cookies.set('token', 'true');
        } catch (e) {
            console.log(e);
            const error28 = (e.response.data.error);
            console.log(error28);
        }
    }

    return (
        <form className="container mt-4" onSubmit={SubmitLogin}>
            <h2>Connexion</h2>
            <div className="form-group">
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" className="form-control email" required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Mot de passe: </label>
                <input type="password" name="password" className="form-control password" required />
            </div>
            <button
                type="submit"
                value="LOGIN"
                className="btn btn-primary"
            >Connexion</button>
        </form>
    )
}
