"use client";

import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import LoginForm from "./Login";
import SignupForm from "./Signup";
import { useRouter } from "next/navigation";
import withAuth from "@/utils/hoc/withAuth";

const Page = () => {
  const router = useRouter();
  const [formLayout, setFormLayout] = useState("login");

  // useEffect(() => {
  //   const name = localStorage.getItem("name");
  //   const email = localStorage.getItem("email");
  //   const id = localStorage.getItem("id");

  //   if (name && email && id) {
  //     router.push("/dashboard");
  //     return;
  //   }
  // }, []);

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {formLayout === "login" ? (
        <LoginForm setFormLayout={setFormLayout} />
      ) : (
        <SignupForm setFormLayout={setFormLayout} />
      )}
      <Grid
        sx={{
          marginTop: "30px",
        }}
      >
        {formLayout === "login" ? (
          <Button onClick={() => setFormLayout("signup")}>Go to signup</Button>
        ) : (
          <Button onClick={() => setFormLayout("login")}>Go to login</Button>
        )}
      </Grid>
    </Grid>
  );
};

export default withAuth(Page, false);
