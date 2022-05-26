import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import { useParams } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@mui/material";
import { Divider } from "@mui/material";

export default function Post() {
  const { id } = useParams();

  const [data, setData] = useState({ posts: [] });
  const [review, setReview] = useState({ review: [] });
  const [user, setUser] = useState(null);

  useEffect(() => {
    axiosInstance.get("post/" + id).then((res) => {
      setData({ posts: res.data });
      console.log(res.data);
      //Get User Data for showing shit
    });
  }, [setData]);

  return (
    <React.Fragment>
      <Container maxWidth="lg" component="main">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography mt={2} mb={1} variant="h3" align="center">
              {data.posts.title}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <img src={data.posts.image} height="auto" width="100%"></img>
          </Grid>
          <Grid item xs={6}>
            <Grid item xs={12} container>
              <Grid item xs={6}>
                <Typography variant="h5" align="center">
                  Kaina: {data.posts.price} € / val
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography align="center">
                  <Button
                    href={"/admin/order/" + data.posts.id}
                    color="primary"
                    variant="contained"
                  >
                    Užsisakyti
                  </Button>
                </Typography>
              </Grid>
              <Grid item xs={12} mt={4}>
                <Typography variant="h5" mb={1} align="left">
                  {data.posts.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Typography mt={4} variant="h4" align="left">
          Atsiliepimai
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography mt={2} mb={1} variant="body1" align="left">
              Tikrai rekomenduoju! Esu labai patenkintas atliktais darbais. Jų
              paslaugų reikėjo atlikti elektroninės prekybos puslapio
              koregavimui, taisymui ir optimizavimui. Viskas atliekama labai
              kokybiškai ir puslapis iškart atsigavo 😀
            </Typography>
            <Typography mt={2} mb={1} variant="body1" align="left">
              Puikūs savo srities specialistai, darbus atlieka greitai ir
              kruopščiai, maloniai atsako į visus rūpimus klausimus, tikrai
              rekomenduojame, būtinai kreipsimės dar kartą.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
