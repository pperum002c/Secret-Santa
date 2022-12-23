import React from 'react'
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const MyButton = () => {
  return (
    <div className='my-btns' initial={{ opacity: 0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
      <Link to="/makeawish">
        <Button label="Make a Wish" className="p-button-rounded p-button-success" id="btn-1"/>
      </Link>
      <Link to="/beasanta">
        <Button label="Be a Santa" className="p-button-rounded p-button-success" id="btn-2" />
      </Link>
      <Link to="/wishes">
        <Button label="Wish List" className="p-button-rounded p-button-success" id="btn-2" />
      </Link>
    </div>
  )
}

export default MyButton