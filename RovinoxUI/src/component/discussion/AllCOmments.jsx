import { Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import CommentBox from "./CommentBox";
import CommentInputBox from "./CommentInputBox";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getComments, getVotes } from "../../duck/discussionSlice";
import Header from "../header/Header";

function Main() {
  const dispatch = useDispatch();

  const [windowW, setWindowW] = useState(window.innerWidth);

  const [selected, setSelected] = useState(0); //0 for none, -id for edit, id for reply

  const { curriculumId } = useParams();
  const comments = useSelector((state) => state.discussion.comments);
  const currentUserObj = useSelector((state) => state.account.user);
  console.log(comments);
  useEffect(() => {
    ["click", "keydown"].forEach((event) =>
      window.addEventListener(event, (e) => {
        if (e.target.id === "root" || e.code === "Escape") {
          setSelected(0);
        }
      })
    );
  }, []);

  useEffect(() => {
    dispatch(getVotes(curriculumId));
    dispatch(getComments(curriculumId));
  }, [curriculumId, dispatch]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowW(window.innerWidth);
    });
  }, []);

  return (
    <>
      <Header />
      <Stack
        sx={{
          my: 6,
          width: 730,
          mx: "auto",
          alignItems: "center",
          "& > * + *": {
            mt: 2,
          },
        }}
      >
        {comments.map((c) => (
          <CommentBox
            key={c.id}
            selected={selected}
            setSelected={setSelected}
            windowW={windowW}
            {...c}
            currentUserObj={currentUserObj}
          />
        ))}
        <CommentInputBox windowW={windowW} />
      </Stack>
    </>
  );
}

export default Main;
