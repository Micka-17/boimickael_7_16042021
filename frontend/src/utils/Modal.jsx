import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react"
import { React, useState } from "react"
import 'bootstrap/dist/css/bootstrap.css'
import Axios from 'axios'

export default function BasicUsage() {

  const [details, setDetails] = useState({ title: "", description: "", image: "", file: '' });
  const { isOpen, onOpen, onClose, onPost } = useDisclosure();

  const SubmitPost = function (e) {
    e.preventDefault()

    /* const dataPost = {
      title: document.querySelector('input.title').value,
      description: document.querySelector('textarea.description').value,
      image: document.querySelector('input.image').value,
      file: document.querySelector('input.image')
    } */
    console.log(details)
    const formData = new FormData();
    formData.append("title", details.title)
    formData.append("description", details.description)
    formData.append("images", details.image)
    formData.append("image", details.file)
    
    //console.log(details.file.name);
    console.log(details.image);

    // object file : details.file
    // todo upload server
    /*.post(UPLOAD_URL, formData)
    .then((res) => {
      alert("File Upload success");
    })
    .catch((err) => alert("File Upload Error"));*/

    const token = localStorage.getItem('token');

    try {
      Axios({
        method: "post",
        url: "http://localhost:3000/api/posts/post",
        data: formData,
        headers: {
          Authorization: "Bearer " + token
        } 
      }).then((response) => {
          alert("Publication prise en compte !")
          console.log("la reponse de axios post " + JSON.stringify(response));
        })
        console.log("voici les data " + formData);
    } catch (e) {
      console.log(e);
      const error28 = (e.response.data.error);
      console.log(error28);
    }
  }

  return (
    <>
      <Button onClick={onOpen}>Poster votre pensé !</Button>
      <Modal isOpen={isOpen} onClose={onClose} onPost={onPost}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nouvelle publication : </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <div className="form-group">
                <label htmlFor="title">Titre : </label>
                <input type="text" name="title" id="title" className="form-control title" required onChange={e => setDetails({ ...details, title: e.target.value })} value={details.title} />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description : </label>
                <textarea type="textarea" name="description" id="description" className="form-control description" required onChange={e => setDetails({ ...details, description: e.target.value })} value={details.description} />
              </div>
              <div className="form-group">
                <label htmlFor="file-upload" class="custom-file-upload">Image : </label>
                <input accept="image/*" type="file" id="image" name="image" className="form-control image" required onChange={e => setDetails({ ...details, image: e.target.value, file: e.target.files[0] })} value={details.image} />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={SubmitPost} type="submit" variant="ghost">Publié</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}