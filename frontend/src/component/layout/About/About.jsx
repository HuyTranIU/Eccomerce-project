import React from 'react'
import { Avatar, Typography, Button } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import "./About.css"

function About() {

  const visitInstagram = () => {
    window.open("https://www.instagram.com/huytrano/", "_blank");
  };

  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://i.pinimg.com/564x/6e/46/b7/6e46b7d9c4b24d60c7ca4c875aaed6c4.jpg"
              alt="Founder"
            />
            <Typography>Huy Tran</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is ECOMMERCE WEBSITE
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://github.com/HuyTranIU"
              target="blank"
            >
              <GitHubIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://www.facebook.com/huytranIU/" target="blank">
              <FacebookIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About