import React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
  CardActionArea,
  Button,
  ButtonGroup,
} from "@mui/material";
import { Link } from "react-router-dom";

const Posts = (props) => {
  const { posts } = props;
  const [selectedCategory, setSelectedCategory] = useState("Visi");
  const allCategories = [
    "Visi",
    "Programavimas",
    "Grafikos dizainas",
    "Svetainių kūrimas",
    "Seo Paslaugos",
    "Aplikaciju kūrimas",
    "Kursai",
    "UI dizainas",
    "UX dizainas",
  ];

  const handleClick = (e) => {
    setSelectedCategory(e);
    console.log(selectedCategory);
  };

  if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Typography variant="h5"> Kategorijos </Typography>
          <ButtonGroup orientation="vertical">
            {allCategories.map((category) => (
              <Button
                onClick={() => handleClick(category)}
                key={category}
                className="btn-color-primary"
                style={{ margin: "5px" }}
              >
                {category}
              </Button>
            ))}
          </ButtonGroup>
        </Grid>
        <Grid item xs={10}>
          <Container maxWidth="lg" component="main">
            <Grid container spacing={5} alignItems="flex-end">
              {posts
                .filter(
                  (post) =>
                    selectedCategory === "Visi" ||
                    post.category === selectedCategory
                )
                .map((post) => {
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
                            <Typography variant="h6" color="text.secondary">
                              {post.category}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Posts;
