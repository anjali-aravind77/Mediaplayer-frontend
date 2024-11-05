
import React, { useEffect, useState } from 'react'
import { Modal, Form, FloatingLabel, Button } from 'react-bootstrap'
import { getAllCategoryApi, removeCategoryApi, saveCategoryApi, updateCategoryApi, removeVideoApi } from '../services/allAPI';
import VideoCard from './VideoCard';


const Category = ({setdeleteResponseFromCategory}) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [categoryName,setCategoryName] = useState("")
  const [allCategories,setallCategories] = useState([])
  
  useEffect(()=>{
    getAllCategory()
  },[])

  const handlesaveCategory = async()=>{
    if(categoryName){
      const categoryDetails = {categoryName,allvideos:[]}
    //  console.log(categoryDetails);
      
      try {        
        const result = await saveCategoryApi(categoryDetails)
        if(result.status>=200 && result.status<300){
          getAllCategory()
          handleClose()
        }
      } catch (error) {
        console.log(error)        
      }
    }

  }

  const getAllCategory  = async()=>{
    try {
      const result = await getAllCategoryApi()   
      if(result.status>=200 && result.status<300){  
          
      setallCategories(result.data)
     // console.log(allCategories)
      }
      
      
    } catch (error) {
      console.log(error)
      
    }
  }

const deleteCategoryFn = async(id) => {
  try {
    await removeCategoryApi(id)
    getAllCategory()
    
  } catch (error) {
    console.log(error)
  }
}

const dragOverCategory = (e)=>{
  e.preventDefault(); //to avoid browser's default behaviour of refreshing                           
}

const videoCardDropOverCategory = async(e, category) => {
  console.log(category)
  const videoDtails = JSON.parse(e.dataTransfer.getData("videoDetails"))
  //update category by adding video to its allVideos field
  category.allvideos.push(videoDtails)

  //api call to make update the category
  await updateCategoryApi(category)
  getAllCategory()
  const result = await removeVideoApi(videoDtails.id)
  setdeleteResponseFromCategory(result)
}


  return (
    <>
    <div className="d-flex justify-content-around align-items-center">
      <h3>All Categories</h3>
      <button className='btn btn-warning rounded-circle fw-bolder fs-5' onClick={handleShow}>+</button>
    </div>

    {/* display all category */}
    <div className="container-fluid mt-3">
      {/* single ctaegory view */}
   {
    allCategories?.length>0?
    allCategories?.map(categorydetails => (
      <div droppable="true" onDragOver={dragOverCategory} onDrop={e=>videoCardDropOverCategory(e,categorydetails)} key={categorydetails?.id} className="border rounded p-3 mb-3">
      <div className="d-flex justify-content-between">
        <h5>{categorydetails?.categoryName}</h5>
        <button className='btn'onClick={()=>deleteCategoryFn(categorydetails?.id)} ><i className='fa-solid fa-trash text-danger'></i></button>
      </div>
      {/* display category videos */}
      <div className="row mt-2">
        {
          categorydetails?.allvideos?.length>0 && 
          categorydetails?.allvideos?.map(video => (
            <div key={video?.id} className="col-lg-4">
          <VideoCard insideCategory={true} displayData={video} />
        </div>
          ))
        }
      </div>
    </div>
    ))   
  :
  <div className="fw-bolder text-danger fs-5">No categories are added yet !!!</div>
   }
    </div>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FloatingLabel controlId="floatingCategory" label="Category">
        <Form.Control onChange={e=>setCategoryName(e.target.value)} type="text" placeholder="category" />
      </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handlesaveCategory} className='btn btn-info' variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Category