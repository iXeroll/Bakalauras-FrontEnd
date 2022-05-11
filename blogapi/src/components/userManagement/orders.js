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
} from "@mui/material";
import axiosInstance from "../../axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export default function Orders() {
  const [data, setData] = useState({ order: [] });
  const [user, setUser] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("admin/order/" + localStorage.getItem("id"))
      .then((res) => {
        setData({ order: res.data });
        console.log(res.data);
        // Get User Data for showing shit
        // axiosInstance.get("user/" + res.data.author).then((res) => {
        //   setUser(res.data);
        // });
      });
  }, [setData]);

  return (
    <React.Fragment>
      <Typography variant="h2" align="center">
        Visi užsakymai
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
                      {/* <TableCell align="center">
                        <Link
                          color="textPrimary"
                          href={"/admin/edit/" + order.id}
                        >
                          <EditIcon></EditIcon>
                        </Link>
                        <Link
                          color="textPrimary"
                          href={"/admin/delete/" + order.id}
                        >
                          <DeleteForeverIcon></DeleteForeverIcon>
                        </Link>
                      </TableCell> */}
                    </TableRow>
                  );
                })}
                {/* <TableRow>
                  <TableCell colSpan={5} align="right">
                    <Button
                      href={"/admin/create"}
                      variant="contained"
                      color="primary"
                    >
                      Naujas skelbimas
                    </Button>
                  </TableCell>
                </TableRow> */}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
