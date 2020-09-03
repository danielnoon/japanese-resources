import React, { FC } from "react";
import SEO from "../components/seo";
import { PageProps, Link } from "gatsby";
import {
  makeStyles,
  Theme,
  createStyles,
  ThemeProvider,
} from "@material-ui/core";
import "../components/layout.css";
import "../components/main.css";
import theme from "../theme";

import CarouselIcon from "@material-ui/icons/ViewCarousel";
import ReviewIcon from "@material-ui/icons/FlashOn";
import LessonIcon from "@material-ui/icons/EmojiObjects";
import ManageIcon from "@material-ui/icons/Settings";
import ExitIcon from "@material-ui/icons/ExitToApp";
import { SRS } from "../SRS";

const linkStyle = (theme: Theme) => ({
  textDecoration: "none",
  display: "flex",
  fontFamily: "Libre Franklin",
  fontWeight: 800,
  fontSize: "2em",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  color: "black",
  cursor: "pointer",
  flexGrow: 1,
  margin: 10,
  transition: "200ms ease-in-out",
  [theme.breakpoints.down("sm")]: {
    margin: 5,
  },
  "&:hover": {
    margin: 0,
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      position: "absolute",
      top: 0,
      bottom: 0,
      width: "100%",
      height: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridTemplateRows: "repeat(5, 1fr)",
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        flexDirection: "column",
      },
      padding: 10,
    },
    flashcardsLink: {
      gridArea: "1 / 1 / 5 / 3",
      backgroundColor: theme.palette.primary.light,
      ...linkStyle(theme),
    },
    reviewsLink: {
      gridArea: "1 / 3 / 3 / 5",
      backgroundColor: theme.palette.primary.main,
      ...linkStyle(theme),
    },
    lessonsLink: {
      gridArea: "3 / 3 / 5 / 5",
      backgroundColor: theme.palette.primary.dark,
      ...linkStyle(theme),
    },
    manageLink: {
      gridArea: "5 / 1 / 6 / 4",
      backgroundColor: theme.palette.secondary.light,
      ...linkStyle(theme),
    },
    exitLink: {
      gridArea: "5 / 4 / 6 / 5",
      backgroundColor: theme.palette.secondary.main,
      ...linkStyle(theme),
    },
    icon: {
      fontSize: 48,
      marginRight: 12,
    },
  })
);

const MyPage: FC<PageProps> = () => {
  const c = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <main className={c.main}>
        <SEO title="My Learning" />
        <Link to="/my/flashcards" className={c.flashcardsLink}>
          <CarouselIcon className={c.icon} />
          Flashcards
        </Link>
        <Link to="/my/reviews" className={c.reviewsLink}>
          <ReviewIcon className={c.icon} />
          {SRS.getNumReviews()} Reviews
        </Link>
        <Link to="/my/lessons" className={c.lessonsLink}>
          <LessonIcon className={c.icon} />
          {SRS.getNumLessons()} Lessons
        </Link>
        <Link to="/my/manage" className={c.manageLink}>
          <ManageIcon className={c.icon} />
          Manage
        </Link>
        <Link to="/" className={c.exitLink}>
          <ExitIcon className={c.icon} />
          Leave
        </Link>
      </main>
    </ThemeProvider>
  );
};

export default MyPage;
