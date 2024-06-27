import { Checkbox, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useEffect, useState } from "react";
import ViewOne from "./ViewOne";
import { useMutation } from "@apollo/client";
import { CHANGE_STATUS, DELETE_PROJECT } from "@/gql/mutations";
import { GET_PROJECTS } from "@/gql/queries";

const ListElement = ({ elem }) => {
  const userId = localStorage.getItem("id");
  const [projectStatus, setProjectStatus] = useState(null);
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: {
      id: elem.id,
    },
    refetchQueries: [{ query: GET_PROJECTS, variables: { clientId: userId } }],
  });
  const [changeProjectStatus] = useMutation(CHANGE_STATUS, {
    variables: {
      id: elem.id,
      status: projectStatus,
    },
    refetchQueries: [{ query: GET_PROJECTS, variables: { clientId: userId } }],
  });

  const [open, setOpen] = useState(false);

  const handleChangeStates = () => {
    if (elem.status === "Not Started" || elem.status === "In Progress") {
      setProjectStatus("completed");
    } else if (elem.status === "Completed") {
      setProjectStatus("running");
    }
  };
  const handleDelete = () => {
    deleteProject();
  };
  const handleView = (id) => {
    setOpen(true);
  };

  useEffect(() => {
    if (projectStatus) {
      changeProjectStatus();
      setProjectStatus(null);
    }
  }, [projectStatus]);
  return (
    <Grid
      md={12}
      container
      alignItems="center"
      sx={{ borderBottom: "1px solid grey", padding: "10px" }}
    >
      <Grid md={2}>
        <Checkbox
          checked={elem.status === "Completed"}
          onChange={() => handleChangeStates()}
        />
      </Grid>
      <Grid md={8}>
        <Typography>{elem.name}</Typography>
      </Grid>
      <Grid md={1}>
        <IconButton onClick={() => handleView()}>
          <RemoveRedEyeIcon />
        </IconButton>
      </Grid>
      <Grid md={1}>
        <IconButton onClick={() => handleDelete()}>
          <DeleteIcon />
        </IconButton>
      </Grid>
      {open && <ViewOne id={elem.id} open={open} setOpen={setOpen} />}
    </Grid>
  );
};

export default ListElement;
