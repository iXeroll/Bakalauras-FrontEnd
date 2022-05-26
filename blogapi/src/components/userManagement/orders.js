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
import axiosInstance from "../../axios";
import MessageIcon from "@mui/icons-material/Message";
import { Navigate, useNavigate } from "react-router-dom";

export default function Orders() {
  const [data, setData] = useState({ order: [] });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("admin/order/buy/" + localStorage.getItem("id"))
      .then((res) => {
        setData({ order: res.data });
        console.log(res.data);
      });
  }, [setData]);

  const moveToMessages = (e) => {
    navigate("/admin/order/messages/" + e);
  };

  return (
    <React.Fragment>
      <Typography variant="h4" align="center">
        Mano užsakymai
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
                  <TableCell align="left">Veiksmai</TableCell>
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
                      <TableCell align="left">{order.comment}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label="confirm"
                          onClick={() => {
                            moveToMessages(order.id);
                          }}
                        >
                          <MessageIcon />
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
