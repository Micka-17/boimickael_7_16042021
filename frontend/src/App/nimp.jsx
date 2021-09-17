import Banner from './App/Banner';
import { React, useState, useEffect } from "react";
import { LoginForm } from "./App/LoginForm";
import { Post } from './App/Post';
import { Footer } from './App/Footer';
import { SignupForm } from "./App/SignupForm";
import { apiFetch } from "./utils/api";
import "./styles/Styles.css"
import { render } from '@testing-library/react';
import { getToken } from './utils/api'
import Cookies from 'js-cookie'
import { BrowserRouter, Route, Link } from "react-router-dom"


export default function App() {

  const token = Cookies.get('token');
  console.log(Cookies)
  console.log("voici mon token cookies " + token);
  //const isAuthenticated = getToken()
  if (token === 'true') {
    return (
      <div className="connected"> <Post /></div>
    )} else {
  return (
      <div>
        <div className="banner"> <Banner /></div>
        <div className="SignForm"> <LoginForm /* onConnect={setUser} */ /> </div>,
        <div className="LoginForm"> <SignupForm /> </div>
        <div className="Footer"> <Footer /></div>
      </div>
  )
}
};
