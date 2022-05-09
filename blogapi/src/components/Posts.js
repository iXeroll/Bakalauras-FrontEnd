import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";

const Posts = (props) => {
  const { posts } = props;
  if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;
  return (
    <React.Fragment>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {posts.map((post) => {
            return (
              // Enterprise card is full width at sm breakpoint
              <Grid item key={post.id} xs={22} md={4}>
                <Card className="cardClass">
                  <Link to={`/post/${post.id}`}>
                    <CardMedia
                      className="cardMedia"
                      image={post.image}
                      title="Image title"
                      style={{ minHeight: 100 }}
                    />
                  </Link>
                  <CardContent className="postTitle">
                    <Typography
                      gutterBottom
                      variant="h6"
                      color="#000dff"
                      component="h2"
                      className="oof4"
                    >
                      {post.title}
                    </Typography>

                    <div className="postPrice">
                      <Typography component="p" color="orange">
                        Kaina: {post.price} €
                      </Typography>
                    </div>
                  </CardContent>
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
