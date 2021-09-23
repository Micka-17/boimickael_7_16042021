import Main from './App/Main';
import { React } from "react";
import { Account } from "./App/Account";
import { Post } from './App/Post';
import "./styles/Styles.css"
import { BrowserRouter as Router, Switch } from "react-router-dom"
import { NotFound } from './App/404';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import food from "./img/food.jpg";

export default function App() {

  const recipeAuthor = "Efecan";
  const recipeItem = {
    title: "Avokado Ezmeli Taco",
    date: "8 Haziran 2021, Salı",
    image: food,
    description:
      "Bu kremsi ve baharatlı avokado sosu, günlük taco'larınızı hazırlamak için harika seçeneklerden biri. Geleneksel olarak flautas veya taquitos ile servis edilir, ancak bazı vegan enchiladalara da harika bir katkı sağlar.",
  };

  const like= 193;
  const isLiked = true;

  const token = localStorage.getItem('token');
  const requireLogin = (to, from, next) => {
      if (localStorage.getItem('token')) {
        next();
    } else {
      next.redirect('/main');
    }
  };

  return (
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
  )
};
