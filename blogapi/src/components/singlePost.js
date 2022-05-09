import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import { useParams } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@mui/material";
import { Divider } from "@mui/material";

export default function Post() {
  const { id } = useParams();

  const [data, setData] = useState({ posts: [] });
  const [user, setUser] = useState(null);

  useEffect(() => {
    axiosInstance.get("post/" + id).then((res) => {
      setData({ posts: res.data });
      console.log(res.data);
      // Get User Data for showing shit
      // axiosInstance.get("user/" + res.data.author).then((res) => {
      //   setUser(res.data);
      // });
    });
  }, [setData]);

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography mt={2} mb={1} variant="h2" align="center">
            {data.posts.title}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <img src={data.posts.image} width="100%"></img>
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={12} container>
            <Grid item xs={6}>
              <Typography variant="h5" align="center">
                Kaina: {data.posts.price} €
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography align="center">
                <Button variant="contained">Užsisakyti</Button>
              </Typography>
            </Grid>
            <Grid item xs={12} mt={4}>
              <Typography variant="h4" mb={1} align="left">
                {data.posts.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Typography mt={4} variant="h2" align="center">
        Review vieta
      </Typography>
    </React.Fragment>
  );
}
