"use client";

import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { style } from "./modalStyle";
import { GET_PROJECT } from "@/gql/queries";
import { useQuery } from "@apollo/client";

const ViewOne = ({ id, open, setOpen }) => {
  const { data: project } = useQuery(GET_PROJECT, {
    variables: { id },
  });
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {project ? (
            <>
              <Typography variant="h6" component="h2">
                {project?.getProject?.name || "NA"}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                {project?.getProject?.description || "NA"}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Status : {project?.getProject?.status || "NA"}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                Auther : {project?.getProject?.client?.name || "NA"}
              </Typography>
            </>
          ) : (
            <>
              <Typography sx={{ mt: 2 }}>Loading ...</Typography>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ViewOne;
