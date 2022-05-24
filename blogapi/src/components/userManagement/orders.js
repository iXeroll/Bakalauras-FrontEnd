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
} from "@mui/material";
import axiosInstance from "../../axios";

export default function Orders() {
  const [data, setData] = useState({ order: [] });
  const [user, setUser] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("admin/order/buy/" + localStorage.getItem("id"))
      .then((res) => {
        setData({ order: res.data });
        console.log(res.data);
      });
  }, [setData]);

  return (
    <React.Fragment>
      <Typography variant="h4" align="center">
        Mano užsakymai
      </Typography>

      <Container maxWidth="lg" component="main">
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
