
import React, { useState } from 'react'
import { Card,Modal } from 'react-bootstrap'
import { removeVideoApi, saveHistoryApi } from '../services/allAPI';


const VideoCard = ({displayData, setDeleteVideoResponsefromVideoCard, insideCategory}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = async() => {
    //display modal    
    setShow(true);
    //store history in json
    const {caption,videoURL} = displayData
    const systemDateTime = new Date()

    const timeStamp = systemDateTime.toLocaleString('en-US',{timeZoneName:"short"});
    const historyDetails={caption,videoURL,timeStamp}
    try {
      await saveHistoryApi(historyDetails)
      
    } catch (error) {
      console.log(error)
    }
  
  }

  const deleteVideo = async(id)=>{
    try {
      const result = await removeVideoApi(id)
       setDeleteVideoResponsefromVideoCard(result)
       

    } catch (error) {
      console.log(error);      
    }   

  }
  const videoDragStart = (e,dragvideoDetails)=>{
  //  console.log("inside drag " + dragvideoDetails?.id)
  e.dataTransfer.setData("videoDetails",JSON.stringify(dragvideoDetails))
  }

  return (
    <>
     <Card draggable={true} onDragStart={e=>videoDragStart(e,displayData)} style={{ height: '250px' }}>
      <Card.Img onClick={handleShow} variant="top" height={'150px'} src={displayData?.imageURL} />
      <Card.Body>       
        <Card.Text className='d-flex justify-content-between'>
          <p style={{color:'white'}}>{displayData?.caption}</p>
          {
            !insideCategory && <button onClick={()=>deleteVideo(displayData.id)} className='btn'><i className='fa-solid fa-trash text-danger'></i> </button>
          }
          
        </Card.Text>
       
      </Card.Body>
    </Card>
  {/* modal code */}
    <Modal size='lg' centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{displayData?.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body><iframe width="100%" height="315" src={`${displayData?.videoURL}?autoplay=1`} allowfullscreen></iframe>
        </Modal.Body>
     
      </Modal>
    </>
  )
}

export default VideoCard