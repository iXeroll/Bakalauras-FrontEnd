import React, { useState } from "react";
import axiosInstance from "../../axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Input,
} from "@mui/material";

export default function Create() {
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);
  const initialFormData = Object.freeze({
    title: "",
    description: "",
    price: "",
    status: "",
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [postimage, setPostImage] = useState(null);

  const handleChange = (e) => {
    if ([e.target.name] === "image") {
      setPostImage({
        image: e.target.files,
      });
      console.log(e.target.files);
    }
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const config = { headers: { "Content-Type": "multipart/form-data" } };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title: formData.title,
      description: formData.description,
      price: formData.price,
      status: formData.status,
      image: postimage,
    });
    axiosInstance
      .post(
        "admin/create",
        {
          author: localStorage.getItem("id"),
          title: formData.title,
          description: formData.description,
          status: formData.status,
          price: formData.price,
          creationDate: today,
          updateDate: today,
          image: postimage.image[0],
        },
        config
      )
      .then((res) => {
        navigate("/admin/");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="paper">
        <Typography component="h1" variant="h5">
          Sukurti nauja paslaugos skelbima
        </Typography>
        <form className="form" noValidate>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Skelbimo pavadinimas"
                name="title"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Skelbimo aprašymas"
                name="description"
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="price"
                label="Kaina"
                name="price"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="status"
                label="Statusas"
                name="status"
                onChange={handleChange}
              />
            </Grid>
            <input
              style={{ marginTop: 20 }}
              accept="image/*"
              className="input"
              id="post-image"
              onChange={handleChange}
              name="image"
              type="file"
            />
          </Grid>
          <Button
            style={{ flex: 1, marginTop: 20 }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
            onClick={handleSubmit}
          >
            Sukurti skelbima
          </Button>
        </form>
      </div>
    </Container>
  );
}
