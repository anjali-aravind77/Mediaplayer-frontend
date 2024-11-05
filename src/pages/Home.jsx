import React, { useState } from 'react'

import Add from '../components/Add'
import Category from '../components/Category'
import VideoCard from '../components/VideoCard'
import View from '../components/View'

import { Link } from 'react-router-dom'


const Home = () => {

  const [deleteResponseFromCategory,setdeleteResponseFromCategory] = useState("")

  //state lifting, state is created in common parent => home (since we need to pass data btwn add and view which are siblings)
  const [addResponseFromHome, setaddResponseFromHome] = useState("")

  return (
    <div style={{paddingTop:'100px'}}>
        <div className="container mb-5 d-flex justify-content-between">
          <Add  setaddResponseFromHome={setaddResponseFromHome}/>
          <Link to={'/history'}>Watch History</Link>
        </div>

        <div className="container-fluid row my-5">
          <div className="col-lg-6" style={{paddingLeft:'20px'}}>
            <h3>All Videos</h3>
            <View deleteResponseFromCategory={deleteResponseFromCategory} addResponseFromHome={addResponseFromHome} />
          </div>
          <div className="col-lg-6">
            <Category setdeleteResponseFromCategory={setdeleteResponseFromCategory} />
          </div>
        </div>

    </div>
  )
}

export default Home