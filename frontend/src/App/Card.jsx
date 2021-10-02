import React from "react"
import "../styles/Cards.css"
import { useState, useCallback } from 'react'
import Axios from 'axios';
import { set } from "js-cookie";

export default function Card(props) {

  const [postInfo, setPostInfo] = useState(null)
  const [id, setId] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const token = localStorage.getItem('token');

  if (!loaded) {
    Axios({
      method: "get",
      url: "http://localhost:3000/api/posts",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then((result) => {
        setPostInfo(result.data)
        setLoaded(true)
        console.log(result.data);
      });
  }
let ids = 1;
  async function deletId() {
   await Axios({
      method: "delete",
      url: `http://localhost:3000/api/posts/${ids}`,
      headers: {
        Authorization: "Bearer " + token
      }
    }).then(function (response) {
      document.location.reload();
    })
  }

  // Boucle for juste ici <========================
  return (
    <div className="App d-flex flex-wrap justify-content-around">
      {postInfo != null
        ?
        postInfo.map(info => {
          const { id, title, user, date, description, imageUrl } = info
          return (
            <div key={title}>
              <div className="card m-2">
                <div className="card-header">
                  <div className="profile">
                    <span className="letter">{user.firstName}</span>
                  </div>
                  <div className="card-title-group">
                    <h5 className="card-title">{title}</h5>
                    <div className="card-date">{date}</div>
                  </div>
                </div>
                <img className="card-image" src={imageUrl} alt="Logo" />
                <div className="card-text">{description}</div>
              </div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={deletId}
              >
                Supprimer le post {id}
              </button>
            </div>
          )
        })
        : 'post null'
      }
    </div>
  )
}