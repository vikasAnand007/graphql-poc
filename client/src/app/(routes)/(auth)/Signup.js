"use client";

import { Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "@/gql/mutations";

const SignupForm = ({ setFormLayout }) => {
  const [fieldValues, setFieldValues] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [addClient, { data }] = useMutation(ADD_CLIENT, {
    variables: {
      name: fieldValues.name,
      email: fieldValues.email,
      phone: fieldValues.phone,
    },
  });

  const handleSubmit = () => {
    const { name, email, phone } = fieldValues;
    if (!name || !email || !phone) {
      alert("All fields are required!");
      return;
    }
    addClient();
  };

  useEffect(() => {
    if (data && data?.addClient) {
      const { message, status } = data.addClient;
      alert(message);
      if (status) {
        setFormLayout && setFormLayout("login");
      }
    }
  }, [data]);
  return (
    <Grid
      sx={{
        margin: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography align="center" variant="h4">
        Signup
      </Typography>
      <Grid>
        <TextField
          type="text"
          label="Name"
          variant="outlined"
          value={fieldValues.name}
          onChange={(e) =>
            setFieldValues((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </Grid>
      <Grid>
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          value={fieldValues.email}
          onChange={(e) =>
            setFieldValues((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </Grid>
      <Grid>
        <TextField
          type="text"
          label="Phone"
          variant="outlined"
          value={fieldValues.phone}
          onChange={(e) =>
            setFieldValues((prev) => ({ ...prev, phone: e.target.value }))
          }
        />
      </Grid>
      <Grid align="right">
        <Button variant="contained" onClick={handleSubmit}>
          Signup
        </Button>
      </Grid>
    </Grid>
  );
};

export default SignupForm;
