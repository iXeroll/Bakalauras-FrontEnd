import React from "react";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Link } from "@mui/material";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Paslaugos
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const footers = [
  {
    title: "Kompanija",
    description: ["Komanda", "Istorija", "Susisiekite", "Vieta"],
  },
  {
    title: "Funkcijos",
    description: ["Komandos funkcija", "Kurėju funkcijos"],
  },
  {
    title: "Ištekliai",
    description: [
      "Resursai",
      "Skelbimų kūrimas",
      "Skelbimų užsakymas",
      "Skelbimų redagavimas",
    ],
  },
  {
    title: "Teisiniai",
    description: ["Privatumo politika", "Naudojimo sąlygos"],
  },
];

function Footer() {
  return (
    <React.Fragment>
      <Divider style={{ flex: 1, marginTop: 40 }}></Divider>
      <Container
        background="blue"
        style={{ flex: 1, marginTop: 40 }}
        color="inherit"
        maxWidth="md"
        component="footer"
        className="footer"
      >
        <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Footer;
