"use client";

import { Grid, Typography } from "@mui/material";

import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "@/gql/queries";
import Image from "next/image";
import ListElement from "./ListElement";

const ListComponent = ({ userData }) => {
  const { data: projectList } = useQuery(GET_PROJECTS, {
    variables: { clientId: userData.id },
  });

  return (
    <Grid
      container
      sx={{
        maxWidth: "800px",
        padding: "20px",
      }}
    >
      <Grid md={12} sx={{ padding: "10px" }}>
        <Typography align="center" variant="h6">
          Projects
        </Typography>
      </Grid>
      {projectList &&
      projectList?.getProjects &&
      projectList.getProjects.length > 0 ? (
        <>
          {projectList.getProjects.map((elem) => {
            return <ListElement key={elem.id} elem={elem} />;
          })}
        </>
      ) : (
        <Grid
          md={12}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            src="/image/noData.jpg"
            height={500}
            width={500}
            alt="No data found"
          />
        </Grid>
      )}
    </Grid>
  );
};

export default ListComponent;
