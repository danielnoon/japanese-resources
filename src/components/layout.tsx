import React, { FC, useState } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql, Link, navigate } from "gatsby";

import "./layout.css";
import "./main.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import {
  ThemeProvider,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import StudyButton from "@material-ui/icons/Style";
import theme from "../theme";

interface LayoutProps {
  pageSlug?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: 460,
      maxWidth: "100%",
    },
    item: {
      textDecoration: "none",
      fontFamily: "Libre Franklin",
      fontWeight: 500,
      color: "rgba(0, 0, 0, 0.9)",
    },
    currentPage: {
      fontWeight: 800,
      paddingLeft: "1em",
    },
    tocHeader: {
      fontFamily: "Libre Franklin",
      fontWeight: 600,
      color: "black",
      fontSize: "1.5em",
      marginBottom: 0,
    },
    closeButton: {
      position: "absolute",
      right: 20,
    },
    title: {
      flexGrow: 1,
    },
  })
);

const Layout: FC<LayoutProps> = ({ children, pageSlug }) => {
  const [navOpen, setNavOpen] = useState(false);
  const classes = useStyles();

  const data = useStaticQuery(graphql`
    {
      allStrapiPage {
        nodes {
          title
          index
          slug
        }
      }
    }
  `);

  const pages = data.allStrapiPage.nodes
    .slice()
    .sort((n1, n2) => n1.index - n2.index);

  const drawer = (
    <div>
      <List>
        <ListItem className={classes.tocHeader}>
          Table of Contents
          <IconButton
            color="inherit"
            edge="end"
            onClick={() => setNavOpen(false)}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {pages.map((page, i) => (
          <Link to={"/" + page.slug} key={page.slug} className={classes.item}>
            <ListItem
              button
              className={page.slug === pageSlug ? classes.currentPage : null}
            >
              {i}. {page.title}
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setNavOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Japanese
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => navigate("/my")}
            >
              <StudyButton />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={navOpen}
          onClose={() => setNavOpen(false)}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
        <div className="main-wrapper">
          <main className="layout-main">{children}</main>
        </div>
      </ThemeProvider>
    </>
  );
};

export default Layout;
