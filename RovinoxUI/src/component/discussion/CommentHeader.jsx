import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import RelativeTime from "@yaireo/relative-time";
import CommentHeaderActions from "./CommentHeaderActions";

function CommentHeader(props) {
  const {
    createdBy,
    currentUserObj,
    createdOn,
    onDelete,
    onEdit,
    onReply,
    reply,
    edit,
    deleted,
    windowW,
  } = props;

  const relativeTime = new RelativeTime();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: 32,
          alignItems: "center",
          justifyContent: "space-between",
          mb: "20px",
        }}
      >
        <Box
          className="header-left"
          sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
        >
          <Avatar
            alt="avatar"
            src={createdBy?.image}
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="username" sx={{ ml: 2 }}>
            {createdBy?.fullName}
          </Typography>
          {createdBy?.id === currentUserObj?.id && (
            <Typography
              variant="you"
              sx={{
                ml: 1,
                height: 18,

                py: "2px",
                px: "6px",
                lineHeight: 1,
                borderRadius: "3px",
              }}
            >
              you
            </Typography>
          )}
          <Typography variant="body" sx={{ ml: 2 }}>
            {relativeTime.from(new Date(createdOn))}
          </Typography>
        </Box>

        {!deleted && windowW > 1024 && (
          <CommentHeaderActions
            currentUserObj={currentUserObj}
            createdBy={createdBy}
            onDelete={onDelete}
            onEdit={onEdit}
            onReply={onReply}
            reply={reply}
            edit={edit}
          />
        )}
      </Box>
    </>
  );
}

export default CommentHeader;
