/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { BsYoutube, BsFacebook, BsTwitter } from "react-icons/bs";

export default function Footer() {
  // const classes = useStyles();
  return (
    <footer className="section__footer">
      <div className="container__footer">
        <div className="row">
          <div className="footer-col">
            <h4>Keep In Toucht</h4>
            <a className="social codepen">
              <div className="iconic">
                <BsYoutube />
              </div>
            </a>
            <a className="social instagram">
              <div className="iconic">
                <BsFacebook />
              </div>
            </a>
            <a className="social youtube">
              <div className="iconic">
                <BsTwitter />
              </div>
            </a>
          </div>
          <div className="footer-col">
            <h4>Company Info</h4>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Blog Posts</h4>
            <ul>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Payment options</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
