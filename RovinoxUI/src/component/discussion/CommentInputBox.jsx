import { Avatar, Box, Button } from "@mui/material";
import React, { useState, useRef } from "react";
import InputField from "./InputField";
import { apiService } from "../../api/axios";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getComments } from "../../duck/discussionSlice";

function CommentInputBox(props) {
  const dispatch = useDispatch();

  const { curriculumId } = useParams();

  const { type, setSelected, windowW, createdBy, id } = props;
  const [text, setText] = useState("");
  const inputField = useRef(null);

  const handleSubmit = async () => {
    if (text.trim().length === 0) return;

    const apiUrl = "http://localhost:5122/api/comment";

    const payload = {
      content: text,
      parentId: id ?? null,
      replyingToId: createdBy?.id,
      curriculumId,
    };
    try {
      const result = await apiService.post(apiUrl, payload);
      console.log(result);
      if (result?.data) {
        dispatch(getComments(curriculumId));
      }
    } catch (err) {
      console.log(err);
    }
    inputField.current.value = "";
    if (typeof setSelected === "function") {
      setSelected(0);
    }
  };
  function handleTextChange(e) {
    setText(e.target.value);
  }

  return (
    <>
      <Box
        id={type === "reply" ? "replyBox" : ""}
        sx={{
          display: "flex",
          width: "100%",
          minHeight: "150px",
          borderRadius: "4px",
          p: 3,
        }}
      >
        {windowW <= 1024 && (
          <>
            <Box sx={{ display: "flex", width: "100%" }}>
              <InputField
                handleChange={handleTextChange}
                type={type}
                r={inputField}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                mt: 2,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="avatar"
                src=""
                sx={{ mr: 2, width: 32, height: 32 }}
              />
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                sx={{
                  width: 104,
                  height: 48,
                  ml: 2,
                  borderRadius: "8px",
                  "&:hover": {
                    boxShadow:
                      "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
                  },
                }}
              >
                {type === "reply" ? "Reply" : "Send"}
              </Button>
            </Box>
          </>
        )}
        {}
        {windowW > 1024 && (
          <>
            <Avatar alt="avatar" src="" sx={{ mr: 2 }} />
            {/* <Avatar alt="avatar" src={selectAvatar(currentUser)} sx={{mr:2}}/> */}
            <InputField
              handleChange={handleTextChange}
              type={type}
              r={inputField}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleSubmit}
              sx={{
                width: 104,
                height: 48,
                ml: 2,
                borderRadius: "8px",
              }}
            >
              {type === "reply" ? "Reply" : "Send"}
            </Button>
          </>
        )}
      </Box>
    </>
  );
}

export default CommentInputBox;
