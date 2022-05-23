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
import Select from "react-select";

export default function Create() {
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);
  const initialFormData = Object.freeze({
    title: "",
    description: "",
    price: "",
    status: "",
  });

  const [category, setCategory] = useState(null);

  const options = [
    { value: "Programavimas", label: "Programavimas" },
    { value: "Grafikos dizainas", label: "Grafikos dizainas" },
    { value: "Svetainių kūrimas", label: "Svetainių kūrimas" },
    { value: "Seo Paslaugos", label: "Seo Paslaugos" },
    { value: "Aplikaciju kūrimas", label: "Aplikaciju kūrimas" },
    { value: "Kursai", label: "Kursai" },
    { value: "UI dizainas", label: "UI dizainas" },
    { value: "UX dizainas", label: "UX dizainas" },
  ];

  const handleCategory = (event) => {
    setCategory(event.value);
  };

  const [formData, updateFormData] = useState(initialFormData);
  const [postimage, setPostImage] = useState(null);

  const handleChange = (e) => {
    if ([e.target.name] == "image") {
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
    axiosInstance
      .post(
        "admin/create",
        {
          author: localStorage.getItem("id"),
          title: formData.title,
          description: formData.description,
          category: category,
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

  const colourStyles = {
    menuList: (styles) => ({
      ...styles,
      background: "white",
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      background: isFocused
        ? "hsla(291, 64%, 42%, 0.5)"
        : isSelected
        ? "hsla(291, 64%, 42%, 1)"
        : undefined,
      zIndex: 1,
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
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
              <Select
                styles={colourStyles}
                options={options}
                value={formData.category}
                id="category"
                name="category"
                isClearable="True"
                isSearchable="True"
                onChange={handleCategory}
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
