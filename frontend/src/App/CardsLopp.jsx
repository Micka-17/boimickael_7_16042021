import React from "react"
import { useState, useCallback } from 'react'
import Axios from 'axios'

export default function Cards() {

    const [postInfo, setPostInfo] = useState({ author: "", title: "", date: "", image: "", description: "", file: '' })
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
                // console.log(result.data[0].user);
                setPostInfo(result.data)
                setLoaded(true)
            });
    }
    const obj = Array.from(postInfo);

    for (let i = 0; i < obj.length; i++) {
        console.log(obj);

        let cards = document.createElement("div");


        cards.classList.add("card", "container-sm", "m-5");
        cards.src = obj[i]._id

        // img
        let imgCam = document.createElement("img");
        cards.appendChild(imgCam);
        imgCam.classList.add("card-image-top", "photo", "img-fluid");
        imgCam.src = obj[i].imageUrl;

        //noms cam
        let nameCam = document.createElement("h3");
        cards.appendChild(nameCam);
        nameCam.classList.add("title");
        nameCam.textContent = obj[i].name;


        // description
        let descripCam = document.createElement("p");
        cards.appendChild(descripCam);
        descripCam.classList.add("text-center");
        descripCam.textContent = obj[i].description;

        // Prix
        let price = document.createElement("p");
        cards.appendChild(price);
        price.classList.add("d-flex", "justify-content-between");
        price.textContent = obj[i].price / 100 + " €";

        let add = document.createElement("p");
        cards.appendChild(add);
        add.classList.add("d-flex", "justify-content-evenly");
        add.innerHTML = `<a class="add" href="../front-end/product.html?id=${obj[i]._id}"><i class="far fa-plus-square fa-3x"></i></a>`;
    }
}