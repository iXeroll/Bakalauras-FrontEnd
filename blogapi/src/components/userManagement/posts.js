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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Posts = (props) => {
  const { posts } = props;
  return (
    <React.Fragment>
      <Container maxWidth="md" component="main">
        <Paper className="root">
          <TableContainer className="container">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Pavadinimas</TableCell>
                  <TableCell align="left">Kaina</TableCell>
                  <TableCell align="left">Statusas</TableCell>
                  <TableCell align="left">Atnaujinimo data</TableCell>
                  <TableCell align="center">Veiksmai</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map((post) => {
                  return (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Link
                          color="textPrimary"
                          href={"/post/" + post.id}
                          className="link"
                        >
                          {post.title}
                        </Link>
                      </TableCell>
                      <TableCell align="left">{post.price}</TableCell>
                      <TableCell align="left">{post.status}</TableCell>
                      <TableCell align="left">{post.updateDate}</TableCell>
                      <TableCell align="center">
                        <Link
                          color="textPrimary"
                          href={"/admin/edit/" + post.id}
                        >
                          <EditIcon></EditIcon>
                        </Link>
                        <Link
                          color="textPrimary"
                          href={"/admin/delete/" + post.id}
                        >
                          <DeleteForeverIcon></DeleteForeverIcon>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell colSpan={5} align="right">
                    <Button
                      href={"/admin/create"}
                      variant="contained"
                      color="primary"
                    >
                      Naujas skelbimas
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default Posts;
