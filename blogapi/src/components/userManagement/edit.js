import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, Grid, TextField, Button } from "@mui/material";
import Select from "react-select";

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

  useEffect(() => {
    axiosInstance.get("post/" + id).then((res) => {
      setCategory(res.data.category);
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
      //setCategory(res.data.category);
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
      category: category,
    });
    axiosInstance
      .put("admin/edit/" + id, {
        author: localStorage.getItem("id"),
        title: formData.title,
        description: formData.description,
        category: category,
        status: formData.status,
        price: formData.price,
        creationDate: formData.creationDate,
        updateDate: today,
      })
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
              <Select
                styles={colourStyles}
                options={options}
                value={{ label: category }}
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
