export default function BasicUsage({ Post }) {

  const [details, setDetails] = useState({ title: "", description: "", image: "" });
  const { isOpen, onOpen, onClose, onPost } = useDisclosure();

    const submitHandler = async function (e) {
      e.preventDefault();
      
      Post(details);
  }

    const token = localStorage.getItem('token');

    Post = () => {
      Axios({
        method: "post",
        url: "http://localhost:3000/api/posts/post",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json"
        }
      },
        {
          token,
          title: details.title,
          description: details.description,
          image: details.image
        }).then((response) => {
          alert("Publication prise en compte !")
          console.log(response);
        }).catch ((e) => {
      console.log(e);
      const error28 = (e.response.data.error);
      console.log(error28);
  })
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
            <form onSubmit={submitHandler}>
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
                <input accept="image/*" type="file" id="image" name="image" className="form-control image" required onChange={e => setDetails({ ...details, img: e.target.value })} value={details.image} />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={submitHandler} type="submit" value="Post" variant="ghost">Publié</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}