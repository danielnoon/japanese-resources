import React, { FC } from "react";
import SEO from "../components/seo";
import { PageProps, Link } from "gatsby";
import { makeStyles } from "@material-ui/core";
import "../components/layout.css";
import "../components/main.css";

const linkStyle = {
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
};

const useStyles = makeStyles({
  main: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "repeat(5, 1fr)",
  },
  flashcardsLink: {
    gridArea: "1 / 1 / 5 / 3",
    ...linkStyle,
  },
  reviewsLink: {
    gridArea: "1 / 3 / 3 / 5",
    ...linkStyle,
  },
  lessonsLink: {
    gridArea: "3 / 3 / 5 / 5",
    ...linkStyle,
  },
  manageLink: {
    gridArea: "5 / 1 / 6 / 4",
    ...linkStyle,
  },
  exitLink: {
    gridArea: "5 / 4 / 6 / 5",
    ...linkStyle,
  },
});

const MyPage: FC<PageProps> = () => {
  const c = useStyles();

  return (
    <main className={c.main}>
      <SEO title="My Learning" />
      <Link to="/" className={c.flashcardsLink}>
        Flashcards
      </Link>
      <Link to="/" className={c.reviewsLink}>
        Reviews
      </Link>
      <Link to="/" className={c.lessonsLink}>
        Lessons
      </Link>
      <Link to="/" className={c.manageLink}>
        Manage
      </Link>
      <Link to="/" className={c.exitLink}>
        Leave
      </Link>
    </main>
  );
};

export default MyPage;
