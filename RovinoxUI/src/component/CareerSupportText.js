import React from "react";
import "./style/banner.scss";
import { Typography, Paper } from "@mui/material";
import studentsPic from "../asset/students.svg";
import GroupPercent from "../asset/GroupPercent.svg";
import GroupPaper from "../asset/GroupPaper.svg";
import Vector3 from "../asset/Vector3.svg";
import factoryUserIcon from "../asset/factoryUserIcon.svg";
import Vector4 from "../asset/Vector4.svg";

export default function Test() {
  return (
    <div class="container">
      <div id="timeline">
        <Paper class="timeline-item">
          <div class="timeline-icon">
            <img src={studentsPic} alt="pic" />
          </div>
          <Paper class="timeline-content">
            <h2>Student Outcomes</h2>
            <Typography>
              Each of our full-time courses pairs technical training with career
              counseling to give you the tools to assist you in your goal to
              become a successful tech professional. The Rovinox Career Support
              team will join you throughout your journey for one-on-one training
              and class sessions designed to teach you the best practices for
              polishing your professional presence.
            </Typography>
          </Paper>
        </Paper>

        <div class="timeline-item">
          <div class="timeline-icon">
            <img src={GroupPercent} alt="pic" />
          </div>
          <div class="timeline-content right">
            <h2>What Career Support Has to Offer</h2>
            <Typography>
              Rovinox is a design, analytics, cybersecurity, and coding bootcamp
              founded in 2013 by professionals who had their lives dramatically
              changed by learning tech skills. The Rovinox brand specializes in
              immersive, in-person, and courses. We’ve grown a lot since our
              first course—taught in a classroom in what used to be an old candy
              factory. Rovinox is now part of Strayer University, with campuses
              across multiple states.
            </Typography>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-icon">
            <img src={GroupPaper} alt="pic" />
          </div>
          <div class="timeline-content">
            <h2>Optimize Your Resume. Build Your Brand</h2>
            <Typography>
              You’ll build a toolset for the job hunt after Rovinox. Our Career
              Support team works closely with each student to develop a
              job-search plan and to help them craft a standout resume, social
              media brand, and tech-skills portfolio.
            </Typography>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-icon">
            <img src={Vector3} alt="pic" />
          </div>
          <div class="timeline-content right">
            <h2>Career Advice and Interview Prepr</h2>
            <Typography>
              We work hard to help you find opportunities and make sure you are
              prepared to meet them. During your time at Rovinox, you’ll
              practice interviewing and learn important tips and tricks that
              will help you during the real thing.
            </Typography>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-icon">
            <img src={factoryUserIcon} alt="pic" />
          </div>
          <div class="timeline-content">
            <h2>Employer Networking</h2>
            <Typography>
              Our graduates continue their journey with on-going access to
              career fairs, continued job search assistance, and invitations to
              networking events to help get them in front of tech employers
              looking for fresh talent.
            </Typography>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-icon">
            <img src={Vector4} alt="pic" />
          </div>
          <div class="timeline-content right">
            <h2>Career Support</h2>
            <Typography>
              One-on-one support, Access to mentors and instructors, Job
              negotiation training and interview coaching, LinkedIn best
              practices training, On-going access to hiring events and
              networking opportunities
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
