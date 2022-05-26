import {
  Grid,
  Paper,
  Container,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import styled from "@emotion/styled";
import SendIcon from "@mui/icons-material/Send";

export default function Messaging() {
  const [data, setData] = useState({ message: [] });
  const [sendingMessage, setSendingMessage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axiosInstance.get("admin/order/messages/" + id).then((res) => {
      setData({ message: res.data });
    });
  }, [setData]);

  const Message = (e) => {
    if (e.reciever == localStorage.getItem("id")) {
      return (
        <Grid item xs={10} mb={5}>
          <Typography align="left">Vartotojas :{e.sender}</Typography>
          <Typography align="left">{e.message}</Typography>
        </Grid>
      );
    } else {
      return (
        <Grid item xs={10} mb={5}>
          <Typography align="right">Vartotojas :{e.sender}</Typography>
          <Typography align="right">{e.message}</Typography>
        </Grid>
      );
    }
  };

  const sendMessage = (e) => {
    axiosInstance
      .post("admin/order/messages/create", {
        order: id,
        sender: localStorage.getItem("id"),
        reciever: 1,
        message: sendingMessage,
      })
      .then((res) => {
        window.location.reload();
      });
  };

  const handleChange = (e) => {
    setSendingMessage(e.target.value);
  };

  return (
    <React.Fragment>
      <Typography variant="h3" align="center" mb={10}>
        Komunikacija
      </Typography>
      <Container maxWidth="md" component="main">
        <Grid container spacing={3} direction="column">
          {data.message.map((oneMessage) => {
            return Message(oneMessage);
          })}
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={10}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="messageSending"
              label="Žinutė"
              name="messageSending"
              multiline
              rows={2}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              type="submit"
              fullHeight
              style={{ height: "100%", width: "100%" }}
              variant="contained"
              color="primary"
              className="submit"
              endIcon={<SendIcon />}
              onClick={() => {
                sendMessage();
              }}
            >
              Siusti
            </Button>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
