import Axios from 'axios';
import {Children, React, useState} from "react";
import PropTypes from 'prop-types'

export function SignupForm({ Signup }) {
    const [error, setError] = useState(null)
    const [loading, setloading] = useState(false)

    const [details, setDetails] = useState({ firstName: "", lastName: "", eamil: "", password: "" });

    const submitHandler = async function (e) {
        setError(null)
        setloading(true)
        e.preventDefault();
        
        Signup(details);
    }
 
     Signup = () => {
        Axios.post("http://localhost:3000/api/auth/signup", {
            firstName: details.firstName,
            lastName: details.lastName,
            email: details.email,
            password: details.password,
        }).then((response) => {
            // w.WriteHeader(http.StatusOK)
            console.log(response);
            console.log('test'); 
        }).catch((e) => {
            //ReactDOM.render(<SuccessSign />, document.getElementsByClassName('password'));
        })
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="container mt-4">
                <h2>Inscription</h2>
                {error && <Alert>{error}</Alert>}
                <div className="form-group">
                    <label htmlFor="firstName">Nom : </label>
                    <input type="text" name="firstName" id="firstName" className="form-control" required onChange={e => setDetails({ ...details, firstName: e.target.value })} value={details.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Prenom : </label>
                    <input type="text" name="lastName" id="lastName" className="form-control" required onChange={e => setDetails({ ...details, lastName: e.target.value })} value={details.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" className="email" className="form-control" required onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe: </label>
                    <input type="password" name="password" className="password" className="form-control" required onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                </div>
                <button disabled={loading} type="submit" value="Signup" className="btn btn-primary" >Connexion</button>
            </div>
        </form> 
    )
}

SignupForm.propTypes = {
    onConnect: PropTypes.func.isRequired
}

function Alert ({message}) {
    return(
        <div className="alert alert-danger">
            {Children}
        </div>
    )
}