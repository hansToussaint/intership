import { Button, Grid2, Typography } from "@mui/material";
import { Link } from "react-router";

const PageNotFound: React.FC = () => {
  return (
    <Grid2
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
    >
      <Grid2>
        <Typography variant="h3" sx={{ mb: 3 }}>
          This page could not be found :(
        </Typography>
      </Grid2>

      <Link to="/">
        <Button
          variant="contained"
          disableRipple
          sx={{
            fontSize: "1.3rem",
            fontFamily: "inherit",
            textTransform: "none",
            // color: ,
            fontWeight: 500,
            borderRadius: "50px",
            padding: "0.8rem 1.9rem",
          }}
        >
          Go to Home
        </Button>
      </Link>
    </Grid2>
  );
};

export default PageNotFound;
