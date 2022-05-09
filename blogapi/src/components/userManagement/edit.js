import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, Grid, TextField, Button } from "@mui/material";

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const today = new Date().toISOString().slice(0, 10);
  const initialFormData = Object.freeze({
    id: "",
    title: "",
    description: "",
    price: "",
    status: "",
    author: "",
    creationDate: "",
    updateDate: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  useEffect(() => {
    axiosInstance.get("post/" + id).then((res) => {
      updateFormData({
        ...formData,
        ["title"]: res.data.title,
        ["description"]: res.data.description,
        ["price"]: res.data.price,
        ["status"]: res.data.status,
        ["author"]: res.data.author,
        ["creationDate"]: res.data.creationDate,
        ["updateDate"]: res.data.updateDate,
      });
      console.log(res.data);
    });
  }, [updateFormData]);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title: formData.title,
      description: formData.description,
      price: formData.price,
      status: formData.status,
    });
    axiosInstance
      .put("admin/edit/" + id, {
        author: localStorage.getItem("id"),
        title: formData.title,
        description: formData.description,
        status: formData.status,
        price: formData.price,
        creationDate: formData.creationDate,
        updateDate: today,
      })
      .then((res) => {
        navigate("/admin/");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="paper">
        <Typography component="h1" variant="h5">
          Atnaujinti skelbima
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
                value={formData.title}
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
                value={formData.description}
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
                value={formData.price}
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
                value={formData.status}
                onChange={handleChange}
              />
            </Grid>
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
            Atnaujinti skelbima
          </Button>
        </form>
      </div>
    </Container>
  );
}
