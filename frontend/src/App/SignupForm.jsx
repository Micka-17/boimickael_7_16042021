import Axios from 'axios';
import { React, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SignupForm({ Signup }) {

    const [details, setDetails] = useState({ firstName: "", lastName: "", email: "", password: "" });

    const submitHandler = async function (e) {
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
            toast("Inscription prise en compte !");
            console.log(response);
            console.log('test');
        }).catch((e) => {
            
            const error31 = JSON.stringify(e.response.data.error.errors[0].message);
            toast(error31);
            console.log("=========>     " + error31);
        })
    };

    return (
        <div className="container-sm right" >
            <form onSubmit={submitHandler}>
                <div className="mt-4">
                    <h2>Inscription</h2>
                    <div className="form-group">
                        <label htmlFor="firstName">Nom : </label>
                        <input type="text" name="firstName" id="firstName" className="form-control" required onChange={e => setDetails({ ...details, firstName: e.target.value })} value={details.firstName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Prenom : </label>
                        <input type="text" name="lastName" id="lastName" className="form-control" required onChange={e => setDetails({ ...details, lastName: e.target.value })} value={details.lastName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email: </label>
                        <input type="email" name="email" className="form-control email" required onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe: </label>
                        <input type="password" name="password" className="form-control password" required onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                    </div>
                    <button type="submit" value="Signup" className="btn btn-primary" >Inscription</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}
