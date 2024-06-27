"use client";

import {
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "@/gql/mutations";
import { GET_PROJECTS } from "@/gql/queries";

const AddComponent = ({ handleClose, userData }) => {
  const [newTopic, setNewTopic] = useState({
    name: "",
    description: "",
    status: "new",
  });

  const [addProject, { data: addResponse }] = useMutation(ADD_PROJECT, {
    variables: {
      name: newTopic.name,
      description: newTopic.description,
      status: newTopic.status,
      clientId: userData.id,
    },
    // update(cache, { data: { addProject } }) {
    //   const { getProjects } = cache.readQuery({ query: GET_PROJECTS });

    //   cache.writeQuery({
    //     query: GET_PROJECTS,
    //     data: { getProjects: [...getProjects, addProject.data] },
    //   });
    // },
    refetchQueries: [
      { query: GET_PROJECTS, variables: { clientId: userData.id } },
    ],
  });

  const handleSubmit = () => {
    const { name, description, status } = newTopic;
    if (!name || !description || !status) {
      alert("All fields are required!");
      return;
    }
    addProject();
  };

  useEffect(() => {
    if (addResponse && addResponse?.addProject) {
      const { message, status, data } = addResponse.addProject;
      alert(message);
      if (status) {
        const { name, description, status, id, client } = data;
        handleClose();
      }
    }
  }, [addResponse]);

  return (
    <Grid
      container
      sx={{
        maxWidth: "800px",
        borderRadius: "10px",
      }}
    >
      <Grid md={12} sx={{ padding: "10px" }}>
        <Typography align="center" variant="h6">
          Add new project
        </Typography>
      </Grid>
      <Grid md={6} sx={{ padding: "10px" }}>
        <TextField
          fullWidth
          type="text"
          label="Name"
          variant="outlined"
          value={newTopic.name}
          onChange={(e) =>
            setNewTopic((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </Grid>
      <Grid md={6} sx={{ padding: "10px" }}>
        <Select
          fullWidth
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={newTopic.status}
          label="Status"
          onChange={(e) =>
            setNewTopic((prev) => ({ ...prev, status: e.target.value }))
          }
        >
          <MenuItem value="new">Not Started</MenuItem>
          <MenuItem value="running">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </Grid>
      <Grid md={12} sx={{ padding: "10px" }}>
        <TextField
          fullWidth
          type="text"
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          value={newTopic.description}
          onChange={(e) =>
            setNewTopic((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
      </Grid>
      <Grid md={12} sx={{ padding: "10px" }}>
        <Button variant="contained" onClick={handleSubmit}>
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddComponent;
