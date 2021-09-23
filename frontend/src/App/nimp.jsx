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


import React from "react";
import "./Card.css";
import food from "../assets/food.jpg"; // Tell webpack this JS file uses this image
import heartOutline from "../assets/heart-outline.png"; // Tell webpack this JS file uses this image
import heartFill from "../assets/heart-fill.png"; // Tell webpack this JS file uses this image

export default function Card(props) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="profile">
          <span className="letter">{props.author[0]}</span>
        </div>
        <div className="card-title-group">
          <h5 className="card-title">{props.title}</h5>
          <div className="card-date">{props.date}</div>
        </div>
      </div>
      <img className="card-image" src={food} alt="Logo" />
      <div className="card-text">{props.description}</div>
      <div className="card-like-bar">
        {props.liked ? (
          <img className="card-like-icon" src={heartFill} alt="Logo" />
        ) : (
          <img className="card-like-icon" src={heartOutline} alt="Logo" />
        )}
        <div className="like-text">
          <b>{props.likeCount}</b> kişi bu tarifi beğendi.
        </div>
      </div>
    </div>
  );
}