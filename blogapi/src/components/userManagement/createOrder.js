import React, { useState, useEffect } from "react";
import axiosInstance from "../../axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Input,
} from "@mui/material";

export default function CreateOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);
  const initialFormData = Object.freeze({
    title: "",
    description: "",
    price: "",
    status: "",
  });

  const [data, setData] = useState({ posts: [] });

  useEffect(() => {
    axiosInstance.get("post/" + id).then((res) => {
      setData({ posts: res.data });
      console.log(res.data);
    });
  }, [setData]);

  const [formData, updateFormData] = useState(initialFormData);

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
      buyer: localStorage.getItem("id"),
      seller: data.posts.author,
      post: data.posts.id,
      comment: formData.description,
      status: "laukiama patvirtinimo",
      price: data.posts.price,
      creationDate: today,
    });
    axiosInstance
      .post("admin/order/create", {
        buyer: localStorage.getItem("id"),
        seller: data.posts.author,
        post: data.posts.id,
        comment: formData.description,
        status: "laukiama patvirtinimo",
        price: data.posts.price,
        creationDate: today,
      })
      .then((res) => {
        navigate("/admin/orders");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="paper">
        <Typography component="h1" variant="h5">
          Sukurti nauja užsakymą
        </Typography>
        <form className="form" noValidate>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Užsakymo aprašymas"
                name="description"
                onChange={handleChange}
                multiline
                rows={4}
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
            Sukurti užsakymą
          </Button>
        </form>
      </div>
    </Container>
  );
}
