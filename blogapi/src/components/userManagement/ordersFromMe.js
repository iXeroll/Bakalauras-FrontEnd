import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  Button,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function OrdersFrom() {
  const [data, setData] = useState({ order: [] });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("admin/order/sell/" + localStorage.getItem("id"))
      .then((res) => {
        setData({ order: res.data });
        console.log(res.data);
      });
  }, [setData]);

  const updatePositive = (e) => {
    axiosInstance
      .patch("admin/order/update/" + e, {
        status: "vykdomas",
      })
      .then((res) => {
        window.location.reload();
      });
  };

  const updateNegative = (e) => {
    axiosInstance
      .patch("admin/order/update/" + e, {
        status: "atšauktas",
      })
      .then((res) => {
        window.location.reload();
      });
  };

  return (
    <React.Fragment>
      <Typography variant="h4" align="center">
        Užsakyti iš manes
      </Typography>
      <Container maxWidth="md" component="main">
        <Paper className="root">
          <TableContainer className="container">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Paslauga</TableCell>
                  <TableCell align="left">Kaina</TableCell>
                  <TableCell align="left">Užsakymo Data</TableCell>
                  <TableCell align="left">Pristatymo data</TableCell>
                  <TableCell align="left">Statusas</TableCell>
                  <TableCell align="left">Aprašymas</TableCell>
                  <TableCell align="left" width="15%">
                    Veiksmai
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.order.map((order) => {
                  return (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Link
                          color="textPrimary"
                          href={"/post/" + order.post}
                          className="link"
                        >
                          {order.post}
                        </Link>
                      </TableCell>
                      <TableCell align="left">{order.price}</TableCell>
                      <TableCell align="left">{order.creationDate}</TableCell>
                      <TableCell align="left">{order.completionDate}</TableCell>
                      <TableCell align="left">{order.status}</TableCell>
                      <TableCell
                        align="left"
                        style={{
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                        }}
                      >
                        {order.comment}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label="confirm"
                          onClick={() => {
                            updatePositive(order.id);
                          }}
                        >
                          <CheckCircleIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            updateNegative(order.id);
                          }}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
