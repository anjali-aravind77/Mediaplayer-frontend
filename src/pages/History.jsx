import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteHistoryApi, getAllHistoryApi } from '../services/allAPI'

const History = () => {
  
  const [allVideoHistory,setAllVideoHistory] = useState([])
  
  useEffect(()=>{
    getAllHistory()
  },[])
  
  const getAllHistory = async ()=>{
    try {
      const result = await getAllHistoryApi()
      if(result.status>=200 && result.status<300){
        setAllVideoHistory(result.data)
      }
      
    } catch (error) {
      console.log(error)
      
    }

  }

  const removeHistory = async(id) => {
    try {
      await deleteHistoryApi(id)
      getAllHistory()

      
    } catch (error) {
      console.log(error)
      
    }

  }



  return (
    <div style={{paddingTop:'100px'}}>
      <div className="container d-flex justify-content-between">
        <h3>Watch History</h3>
        <Link to={'/home'}>Back to Home</Link>
      </div>
      <table className='container my-5 table'>
        <thead>
          <tr>
            <td>#</td>
            <td>Caption</td>
            <td>Link</td>
            <td>Time Stamp</td>
            <td><button className='btn' disabled={true} style={{border:'none'}}><i className="fa-solid fa-ellipsis-vertical"></i></button></td>
           
          </tr>
        </thead>
        <tbody>
          {
          allVideoHistory?.length > 0 ?
          allVideoHistory?.map((videoDetails,index) => (<tr key={videoDetails?.id}>
            <td>{index+1}</td>
            <td>{videoDetails?.caption}</td>
            <td><a target='_blank' href={videoDetails?.videoURL}>{videoDetails?.videoURL}</a></td>
            <td>{videoDetails?.timeStamp}</td>
            <td><button onClick={()=> removeHistory(videoDetails?.id)} className='btn'><i className="fa-solid fa-trash text-danger"></i></button></td>
          </tr>
          ))
          :
          <div className='fw-bolder text-danger'>You did not watch any video yet !!!</div>        

        }

          
        </tbody>
      </table>
    </div>
  )
}

export default History