"use client";

import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CLIENT_LOGIN } from "@/gql/mutations";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [fieldValues, setFieldValues] = useState({
    email: "",
  });

  const [clientLogin, { data : loginResponse }] = useMutation(CLIENT_LOGIN, {
    variables: {
      email: fieldValues.email,
    },
  });

  const handleSubmit = () => {
    const { email } = fieldValues;
    if (!email) {
      alert("All fields are required!");
      return;
    }
    clientLogin();
  };

  useEffect(() => {
    if (loginResponse && loginResponse?.clientLogin) {
      const { message, status, data } = loginResponse.clientLogin;
      alert(message);
      if (status) {
        const {name, email, id} = data;
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("id", id);
        router.push("/dashboard");
      }
    }
  }, [loginResponse]);

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
        Login
      </Typography>
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
      <Grid align="right">
        <Button variant="contained" onClick={handleSubmit}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
