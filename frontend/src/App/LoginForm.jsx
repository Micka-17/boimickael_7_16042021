import {Children, React, useState} from "react";
import PropTypes from 'prop-types'
import { ApiErrors } from "../utils/api";


export function LoginForm({onConnect}) {

    const [error, setError] = useState(null)
    const [loading, setloading] = useState(false)
    const handleSubmit = async function (e) {
        setError(null)
        setloading(true)
        e.preventDefault()
        const data = new FormData(e.target)
         try {
        const user = await fetch("http://localhost:3000/api/auth/login",
            {
                method: 'POST',
                body: data,
            })
                onConnect(user)
            } catch (e) {
                if (e instanceof ApiErrors) {
                    setError(e.errors[0].message)
            } else {
                console.error(e)
            } 
                setloading(false)
            }      
    }

    return (
        <form className="container mt-4" onSubmit={handleSubmit}>
            <h2>Connexion</h2>
            {error && <Alert>{error}</Alert>}
            <div className="form-group">
                <label htmlFor="email">Email: </label>
                <input type="email" name="email" className="email" className="form-control" required/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Mot de passe: </label>
                <input type="password" name="password" className="password" className="form-control" required/>
            </div>
            <button disabled={loading} type="submit" value="LOGIN" className="btn btn-primary" >Connexion</button>
        </form>
    )
}

LoginForm.propTypes = {
    onConnect: PropTypes.func.isRequired
}

function Alert ({message}) {
    return(
        <div className="alert alert-danger">
            {Children}
        </div>
    )
}