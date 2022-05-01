import React from 'react'
import { Button } from '@material-ui/core';
import "./Contact.css"

function Contact() {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:mymailforabhi@gmail.com">
        <Button>Contact: trandoanhuy.work@gmail.com</Button>
      </a>
    </div>
  )
}

export default Contact