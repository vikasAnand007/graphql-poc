import { Grid, Skeleton } from "@mui/material";

const Loader = () => {
  return (
    <Grid
      container
      sx={{
        maxWidth: "800px",
        padding: "20px",
      }}
    >
      <Grid md={12} sx={{ padding: "10px" }}>
        <Skeleton variant="rectangular" height={60} />
      </Grid>
      <Grid md={12} sx={{ padding: "10px" }}>
        <Skeleton variant="rectangular" height={60} />
      </Grid>
      <Grid md={12} sx={{ padding: "10px" }}>
        <Skeleton variant="rectangular" height={60} />
      </Grid>
      <Grid md={12} sx={{ padding: "10px" }}>
        <Skeleton variant="rectangular" height={60} />
      </Grid>
      <Grid md={12} sx={{ padding: "10px" }}>
        <Skeleton variant="rectangular" height={60} />
      </Grid>
      <Grid md={12} sx={{ padding: "10px" }}>
        <Skeleton variant="rectangular" height={60} />
      </Grid>
      <Grid md={12} sx={{ padding: "10px" }}>
        <Skeleton variant="rectangular" height={60} />
      </Grid>
    </Grid>
  );
};

export default Loader;
