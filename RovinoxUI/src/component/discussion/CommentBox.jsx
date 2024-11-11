import { Box, Typography, Divider } from "@mui/material";
import React, { useState } from "react";
import CommentHeader from "./CommentHeader";
import CommentHeaderActions from "./CommentHeaderActions";
import CommentInputBox from "./CommentInputBox";
import EditField from "./EditField";
import ScoreButton from "./ScoreButton";
import { useParams } from "react-router-dom";
import { apiService } from "../../api/axios";
import { useSelector, useDispatch } from "react-redux";
import { updateVote, getComments } from "../../duck/discussionSlice";
import ConfirmationModal from "../common/ConfirmationModal";

function CommentBox(props) {
  const dispatch = useDispatch();
  const { curriculumId } = useParams();
  const [loading, setLoading] = useState(false);
  const vote = useSelector((state) => state.discussion.vote);
  const { upvoted, downvoted, id: voteId } = vote;

  const {
    id,
    content,
    createdOn,
    score,
    user,
    currentUserObj,
    createdBy,
    children,
    replyingTo,
    replyingToId,
    selected,
    setSelected,
    windowW,
  } = props;

  const [editText, setEditText] = useState(content);
  const [totalVotes, setTotalVotes] = useState(score);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currUserVote, setCurrUserVote] = useState(0);

  const handleConfirmDelete = async () => {
    setLoading(true);

    const apiUrl = ` http://localhost:5122/api/comment/delete/commentId/${id}`;

    try {
      const result = await apiService.delete(apiUrl);
      console.log(result);
      if (result?.data) {
        dispatch(getComments(curriculumId));
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    setDialogOpen(false);
  };

  const handleUpvote = async () => {
    const tempUpArray = [...upvoted];
    let tempDownArray = [...downvoted];
    if (upvoted.includes(id)) return;
    else if (downvoted.includes(id)) {
      tempDownArray = downvoted.filter((foundId) => foundId !== id);
    } else {
      tempUpArray.push(id);
    }
    setLoading(true);

    const apiUrl = "http://localhost:5122/api/vote";
    const voteType = "upvoted";
    const postPayload = {
      upvoted: tempUpArray,
      downvoted: tempDownArray,
      curriculumId,
      voteType,
      commentId: id,
    };
    const putPayload = {
      upvoted: tempUpArray,
      downvoted: tempDownArray,
      id: voteId,
      voteType,
      commentId: id,
    };

    try {
      if (!voteId) {
        const result = await apiService.post(apiUrl, postPayload);
        console.log(result);
        if (result?.data) {
          dispatch(updateVote(result?.data));
          dispatch(getComments(curriculumId));
        }
      } else {
        const result = await apiService.put(apiUrl, putPayload);
        console.log(result);
        if (result?.data) {
          dispatch(updateVote(result?.data));
          dispatch(getComments(curriculumId));
        }
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const handleDownvote = async () => {
    const tempUpArray = [...upvoted];
    let tempDownArray = [...downvoted];
    if (downvoted.includes(id)) return;
    else if (upvoted.includes(id)) {
      upvoted = upvoted.filter((foundId) => foundId !== id);
    } else {
      tempDownArray.push(id);
    }
    setLoading(true);

    const apiUrl = "http://localhost:5122/api/vote";
    const voteType = "downvoted";
    const postPayload = {
      upvoted: tempUpArray,
      downvoted: tempDownArray,
      curriculumId,
      voteType,
      commentId: id,
    };
    const putPayload = {
      upvoted: tempUpArray,
      downvoted: tempDownArray,
      id: voteId,
      voteType,
      commentId: id,
    };

    try {
      if (!voteId) {
        const result = await apiService.post(apiUrl, postPayload);
        console.log(result);
        if (result?.data) {
          dispatch(updateVote(result?.data));
          dispatch(getComments(curriculumId));
        }
      } else {
        const result = await apiService.put(apiUrl, putPayload);
        console.log(result);
        if (result?.data) {
          dispatch(updateVote(result?.data));
          dispatch(getComments(curriculumId));
        }
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  function handleEdit() {
    setSelected(-id);
  }
  function handleReply() {
    // console.log(id);
    // return
    setSelected(id);
  }

  function handleEditTextChange(e) {
    setEditText(e.target.value);
  }

  const handleEditSubmit = async () => {
    //on submitting edit text change
    if (editText === content) return;
    setLoading(true);

    const apiUrl = "http://localhost:5122/api/comment";

    const putPayload = {
      id,
      content: editText,
    };

    try {
      const result = await apiService.put(apiUrl, putPayload);
      console.log(result);
      if (result?.data) {
        dispatch(getComments(curriculumId));
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    setSelected(0);
  };
  function handleDelete() {
    //on pressing delete button
    setDialogOpen(true);
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          minHeight: "150px",
          bgcolor: "#212242",
          borderRadius: "4px",
          p: 3,
        }}
      >
        {content !== "\0" && windowW > 1024 && (
          <ScoreButton
            score={score}
            onPlus={handleUpvote}
            onMinus={handleDownvote}
            upvoted={currUserVote === 1}
            downvoted={currUserVote === -1}
            loading={loading}
          />
        )}
        <Box sx={{ flexGrow: 1, ml: 3 }}>
          <CommentHeader
            currentUserObj={currentUserObj}
            createdBy={createdBy}
            user={user}
            createdOn={createdOn}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onReply={handleReply}
            reply={selected === id}
            edit={selected === -id}
            deleted={content === "\0"}
            windowW={windowW}
          />
          {content !== "\0" ? (
            selected === -id ? (
              <EditField
                defaultValue={content}
                onChange={handleEditTextChange}
                onSubmit={handleEditSubmit}
              />
            ) : (
              <Typography variant="body" sx={{ flexGrow: 1 }} component="p">
                {replyingToId && (
                  <Typography color="primary" component="span">
                    {"@" + replyingTo?.fullName + " "}
                  </Typography>
                )}
                {content.split("\n").map((line, i) => {
                  return (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  );
                })}
              </Typography>
            )
          ) : (
            <Typography variant="deleted">
              This comment has been deleted.
            </Typography>
          )}
          {windowW <= 1024 && content !== "\0" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <ScoreButton
                score={totalVotes}
                onPlus={handleUpvote}
                onMinus={handleDownvote}
                direction="row"
              />
              <CommentHeaderActions
                currentUserObj={currentUserObj}
                createdBy={createdBy}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onReply={handleReply}
                reply={selected === id}
                edit={selected === -id}
              />
            </Box>
          )}
        </Box>
      </Box>
      {selected === id && (
        <CommentInputBox
          id={id}
          createdBy={createdBy}
          replyingTo={replyingTo}
          setSelected={setSelected}
          selected={selected}
          windowW={windowW}
        />
      )}
      {children && children.length > 0 && (
        <Box sx={{ display: "flex", width: "100%" }}>
          <Divider
            orientation="vertical"
            sx={{
              ml: 5.5,
              mr: 5.5,
              borderRightWidth: "2px",
              borderColor: "white",
            }}
            flexItem
          />
          <Box sx={{ "& > * + *": { mt: 2 }, width: "100%" }}>
            {children.map((reply) => {
              return (
                <CommentBox
                  key={reply.id}
                  {...reply}
                  selected={selected}
                  setSelected={setSelected}
                  windowW={windowW}
                />
              );
            })}
          </Box>
        </Box>
      )}
      <ConfirmationModal
        openModal={dialogOpen}
        setOpenModal={setDialogOpen}
        onConfirm={handleConfirmDelete}
        message=" Are you sure you want to delete this comment? This will remove the comment and can't be undone."
      />
    </>
  );
}

export default CommentBox;
