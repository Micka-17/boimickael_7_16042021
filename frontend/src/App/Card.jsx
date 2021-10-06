import React from "react"
import "../styles/Cards.css"
import { useState, useCallback } from 'react'
import Axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
      });
  }

  async function deletId(id) {
    try {
      await Axios({
        method: "delete",
        url: `http://localhost:3000/api/posts/${id}`,
        headers: {
          Authorization: "Bearer " + token
        }
      }).then(function (response) {
        document.location.reload();
      })
    } catch (e) {
      const error30 = (e.response.data.error);
      toast(error30);
    }
  }

  // Boucle for juste ici <========================
  return (
    <div className="App d-flex flex-wrap justify-content-around flex-row-reverse">
      {postInfo != null
        ?
        postInfo.map(info => {
          const { id, title, user, date, description, imageUrl } = info
          return (
            <div className="overflow-hidden" key={title}>
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
                onClick={() => deletId(id)}
              >
                Supprimer le post
              </button>
              <ToastContainer />
            </div>
          )
        })
        : 'post null'
      }
    </div>
  )
}