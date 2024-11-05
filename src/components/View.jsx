
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import VideoCard from './VideoCard'
import { getAllVideosApi } from '../services/allAPI'

const View = ({addResponseFromHome,deleteResponseFromCategory}) => {
  
  
const [allVideos,setallVideos] = useState([]) 
const [deleteVideoResponsefromVideoCard,setDeleteVideoResponsefromVideoCard] = useState("")

  useEffect(()=>{
    getAllVideos()
  },[addResponseFromHome,deleteVideoResponsefromVideoCard,deleteResponseFromCategory])


  //if use effect dependency is empty, one time browseril dsiplay aakumbo mathre ath call aaku. appo useeffectinte dependency trigger aakanel, dependencyil add cheyyanm
//only then, modal through new video add cheyyumbo ath view componentil kittullu and update cheyyulu.

  const getAllVideos = async()=>{
      try {
        const result = await getAllVideosApi()
        if(result.status>=200 && result.status<300){
          setallVideos(result.data)
          
        }
        
      } catch (error) {
        console.log(error)
        
      }
  }


  return (
    <>
      <Row>
        {
          allVideos?.length>0?
          allVideos?.map(video => (
            <Col key={video?.id} className='mb-2' sm={12} md={6} lg={4} >
              <VideoCard setDeleteVideoResponsefromVideoCard={setDeleteVideoResponsefromVideoCard} displayData = {video}/>
              </Col>
          ))
          :
          <div className='fw-bolder text-danger fs-5'>No videos are uploaded yet!!</div>
        }
        
      </Row>

    </>
  )
}

export default View