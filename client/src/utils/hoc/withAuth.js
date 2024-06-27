"use client";

import { Grid } from "@mui/material";

const { default: Loader } = require("@/app/(routes)/dashboard/Loader");
const { redirect } = require("next/navigation");
const { useState, useEffect } = require("react");

const withAuth = (Component, isProtected) => {
  return function WithAuth(props) {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
      const name = localStorage.getItem("name");
      const email = localStorage.getItem("email");
      const id = localStorage.getItem("id");

      let authenticated = false;

      if (name && email && id) {
        authenticated = true;
      }
      if (authenticated && !isProtected) {
        redirect("/dashboard");
      }
      if (!authenticated && isProtected) {
        redirect("/");
      }
      setUserData({
        name,
        email,
        id,
      });
    }, []);

    if (!userData) {
      return (
        <Grid
          sx={{
            margin: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <Loader />
        </Grid>
      );
    }
    return <Component {...props} userData={userData} />;
  };
};

export default withAuth;
