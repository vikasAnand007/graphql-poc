"use client";

import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { useState } from "react";
import ListComponent from "./ListComponent";
import AddComponent from "./AddComponent";
import Loader from "./Loader";
import { useRouter } from "next/navigation";
import { style } from "./modalStyle";
import withAuth from "@/utils/hoc/withAuth";

const Page = ({ userData }) => {
  console.log("userData", userData);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logoutHandler = () => {
    localStorage.clear();
    router.push("/");
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Grid
      sx={{
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      {!userData ? (
        <Loader />
      ) : (
        <>
          <Typography align="center" variant="h4">
            Hi, {userData.name}
          </Typography>
          <Grid>
            <ListComponent userData={userData} />
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "100px",
            }}
          >
            <Button variant="contained" onClick={handleOpen}>
              Add new project
            </Button>
            <Button variant="contained" color="error" onClick={logoutHandler}>
              Logout
            </Button>
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <AddComponent handleClose={handleClose} userData={userData} />
            </Box>
          </Modal>
        </>
      )}
    </Grid>
  );
};

export default withAuth(Page, true);
