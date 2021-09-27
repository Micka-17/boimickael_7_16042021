import Main from './App/Main';
import { React } from "react";
import { Account } from "./App/Account";
import { Post } from './App/Post';
import "./styles/Styles.css"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import { NotFound } from './App/404';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import { ChakraProvider } from "@chakra-ui/react"

export default function App() {

  const requireLogin = (to, from, next) => {
    if (localStorage.getItem('token')) {
      next();
    } else {
      next.redirect('/main');
    }
  };

  return (
    <ChakraProvider>
    <Router>
      <GuardProvider guards={[requireLogin]} error={Main} >
        <Switch>
          <GuardedRoute path="/main" component={Main} />
            <GuardedRoute path="/post" component={Post} />
          <GuardedRoute path="/account" component={Account} />
          <GuardedRoute path="/" component={NotFound} />
        </Switch>
      </GuardProvider>
    </Router>
    </ChakraProvider>
  )
};
