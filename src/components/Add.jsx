
import React from 'react'

import { Modal,Form,FloatingLabel } from 'react-bootstrap'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { saveVideoApi } from '../services/allAPI';

const Add = ({setaddResponseFromHome}) => {
  const [invalidYoutubeLink,setInvalidYoutubeLink] = useState(false)
  
  const [show, setShow] = useState(false);
  const [videoDetails,setvideoDetails] = useState({
    caption:'',
    imageURL:'',
    videoURL:''
  })
  // console.log(videoDetails) https://www.youtube.com/watch?v=WNXFyIATWe0

  const extractingEmbedYoutubeLink = (userInputYoutubeLink) =>{
    if(userInputYoutubeLink.includes("https://www.youtube.com/watch?v=")){
        //console.log(userInputYoutubeLink.split("v")[1].slice(0,11));
        
        if(userInputYoutubeLink.split("v")[1].slice(0,11).length == 11){
          const videoId = userInputYoutubeLink.split("v=")[1].slice(0,11)        
          setInvalidYoutubeLink(false)
          setvideoDetails({...videoDetails,videoURL:`https://www.youtube.com/embed/${videoId}`})
        } 
        else{
          setInvalidYoutubeLink(true)
          setvideoDetails({...videoDetails,videoURL:""})
        }       
    }
    else{
      setInvalidYoutubeLink(true)
      setvideoDetails({...videoDetails,videoURL:""})
    }
  }

//image url => https://i.ytimg.com/vi/vqu4z34wENw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBrAmaW4nylwvA2Zb40bve_gf8laA


const handleUploadVideo = async ()=>{
  const {caption,imageURL,videoURL} = videoDetails
  if(caption && imageURL && videoURL){
   // alert("proceed")
   try {
   const result = await saveVideoApi(videoDetails)

   if(result.status >= 200 && result.status < 300){
    
    handleClose()
    //pass result to view component
    setaddResponseFromHome(result)
   }
   else{
    console.log(result);
   }
    
   } catch(err) {
    console.log(err);
   }
  }
  else{
    alert("please fill the form completely")
  }
}


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    
    <div className="d-flex align-items-center">
      <h5 style={{fontFamily:'cursive'}}>Upload New Video</h5>
      <button className="btn rounded-circle ms-3 btn-warning fw-bolder fs-5" onClick={handleShow}>+</button>
    </div>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Video Details !!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <div className="rounded p-3 border">
          <FloatingLabel controlId="floatingCaption" label="Video Caption">
            <Form.Control onChange={e => setvideoDetails({...videoDetails,caption:e.target.value})} type="text" placeholder="Video Caption" />
          </FloatingLabel>
          <FloatingLabel className='mt-2' controlId="floatingUrl" label="Video Image URL">
            <Form.Control onChange={e => setvideoDetails({...videoDetails,imageURL:e.target.value})} type="text" placeholder="Video Image URL" />
          </FloatingLabel>
          <FloatingLabel className='mt-2' controlId="floatingLink" label="Video Youtube Link">
            <Form.Control onChange={e =>extractingEmbedYoutubeLink(e.target.value)} type="text" placeholder="Video Youtube Link" />
          </FloatingLabel>
          {
            invalidYoutubeLink && 
            <div className='text-danger fw-bolder mt-2'>Invalid yotube Link..!!Please try with another </div>
          }
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="btn btn-info" variant="primary" onClick={handleUploadVideo}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add