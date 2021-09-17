import Banner from './App/Banner';
import { React } from "react";
import { LoginForm } from "./App/LoginForm";
import { Account } from "./App/Account";
import { Post } from './App/Post';
import { Footer } from './App/Footer';
import { SignupForm } from "./App/SignupForm";
import "./styles/Styles.css"
import Cookies from 'js-cookie'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { NotFound } from './App/404';

export default function App() {

  const token = Cookies.get('token');
  if (token === 'true') {
    return (
      <Router>
        <Switch>
          <Route exact path="/post" component={Post} />
          <Route exact path="/account" component={Account} />
          <Route path="/"  component={NotFound}/>
        </Switch>
      </Router>
    )
  } else {
    return (
      <div>
        <Router>
          <Banner />
          <LoginForm />
          <SignupForm />
          <Footer />
        </Router>
      </div>
    )
  }
};
