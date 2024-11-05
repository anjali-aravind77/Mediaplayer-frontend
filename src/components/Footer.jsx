import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div style={{height:'300px'}} className='mt-5 container w-100'>
      <div className="d-flex justify-content-between">
        {/* intro*/}
        <div style={{width:'400px'}}>
              <h5>
              <span className='text-info'> <i className="fa-solid fa-music me-2"></i></span>
              <span className='text-warning'> Media Player</span>
              </h5>
                <p>
                Designed and built with all the love in the world by the Bootstrap team with the help of our contributors.
                </p>
                <p>
                Code licensed MIT, docs CC BY 3.0.
                </p>
                <p>
                Currently v5.3.3.
                </p>

        </div>

        {/* links */}
        <div className='d-flex flex-column'>
          <h5 className='text-warning'>Links</h5>
          <Link to={'/'} style={{textDecoration:'none', color:'white'}}>Landing Page</Link>
          <Link to={'/home'} style={{textDecoration:'none', color:'white'}}>Home</Link>
          <Link to={'/history'} style={{textDecoration:'none', color:'white'}}>History</Link>
        </div>

      {/* guides */}
      <div className='d-flex flex-column'> 
        <h5 className='text-warning'>Guides</h5>
        <a style={{textDecoration:'none', color:'white'}} href="https://react.dev/" target='_blank'>React</a>
        <a style={{textDecoration:'none', color:'white'}} href="" target='_blank'>React Router</a>
        <a style={{textDecoration:'none', color:'white'}} href="" target='_blank'>React Bootstrap</a>
      </div>

{/* contact */}
<div className="d-flex flex-column">
  <h5 className='text-warning'>Contacts</h5>
  <div className="d-flex">
    <input placeholder='Enter your email here!!' type="text" className="form-control me-2" />
    <button className="btn btn-info"><i className="fa-solid fa-arrow-right"></i> </button>
  </div>
  <div className='d-flex mt-3 justify-content-between'>
    <a style={{textDecoration:"none", color:'white'}} href="" target='_blank'><i className="fa-brands fa-twitter"></i> </a>
    <a style={{textDecoration:"none", color:'white'}} href="" target='_blank'><i className="fa-brands fa-facebook"></i> </a>
    <a style={{textDecoration:"none", color:'white'}} href="" target='_blank'><i className="fa-brands fa-instagram"></i> </a>
    <a style={{textDecoration:"none", color:'white'}} href="" target='_blank'><i className="fa-brands fa-linkedin"></i> </a>
    <a style={{textDecoration:"none", color:'white'}} href="" target='_blank'><i className="fa-brands fa-github"></i> </a>
    <a style={{textDecoration:"none", color:'white'}} href="" target='_blank'><i className="fa-brands fa-phone"></i> </a>
  </div>
</div>
        </div>
    
    {/* copywrite */}
    <p className='text-center mt-3'>Copywrite &copy; July 2024 Batch, Media Player App. Built with React. </p>
    
    </div>
  )
}

export default Footer