import React from "react";
import "./style/banner.scss";
import { Typography } from "@mui/material";
import studentsPic from "../asset/students.svg";
import GroupPercent from "../asset/GroupPercent.svg";
import GroupPaper from "../asset/GroupPaper.svg";

export default function Test() {
  return (
    <div className="container">
      <div id="timeline">
        <div className="timeline-item">
          <div className="timeline-icon">
            <img src={studentsPic} alt="pic" />
          </div>
          <div className="timeline-content">
            <h2> 1. BEGIN ONLINE APPLICATION</h2>
            <Typography>
              You can easily complete the first section of the online
              application to Rovinox in half an hour or less. This step requires
              some basic information about you as well as your interest in the
              course.
            </Typography>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon">
            <img src={GroupPercent} alt="pic" />
          </div>
          <div className="timeline-content right">
            <h2> 2. PHONE CONSULTATION</h2>
            <Typography>
              Once you’ve completed the first section of your online
              application, you’ll schedule a short phone consultation with one
              of our friendly admissions counselors. They will make sure you’re
              prepared for the program and answer any of your Rovinox questions.
            </Typography>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon">
            <img src={GroupPaper} alt="pic" />
          </div>
          <div className="timeline-content">
            <h2> 3. SKILL REVIEW</h2>
            <Typography>
              The last step in the application process is the skill review. This
              is an exercise designed to help you and Rovinox know whether the
              program you’re applying for is a good fit. We don’t expect you to
              be an expert and it’s okay to take a skill review without prior
              experience.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
