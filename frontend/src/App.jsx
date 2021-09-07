import Banner from './App/Banner';
import { React, useState, useEffect } from "react";
import { LoginForm } from "./App/LoginForm";
import { SignupForm } from "./App/SignupForm";
import { apiFetch } from "./utils/api";


export default function App() {
  const [user, setUser] = useState(null)

  useEffect(function () {
    apiFetch('/me')
      .then(user => setUser)
      .catch(() => setUser(false))
  }, [])

  if (user === null) {
    return null;
  }

  return (
    <div>
      <div className="banner"> <Banner /></div>
      <div className="SignForm"> <LoginForm onConnect={setUser} /> </div>,
      <div className="LoginForm"> <SignupForm /> </div>
    </div>
  );
};
