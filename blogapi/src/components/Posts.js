import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";

const Posts = (props) => {
  const { posts } = props;
  if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;
  return (
    <React.Fragment>
      <Container maxWidth="lg" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {posts.map((post) => {
            return (
              // Enterprise card is full width at sm breakpoint
              <Grid item key={post.id} xs={22} md={4} height="100%">
                <Card sx={{ maxWidth: 500, maxHeight: 450 }}>
                  <CardActionArea href={`/post/${post.id}`}>
                    <CardMedia
                      component="img"
                      height="120"
                      image={post.image}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6">
                        {post.title}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        Kaina: {post.price} € / val
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </React.Fragment>
  );
};
export default Posts;
