import React, { FC, useState } from "react";
import { PageProps, navigate } from "gatsby";
import {
  makeStyles,
  List,
  ListItem,
  FormControlLabel,
  Checkbox,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import { FlashcardDeck } from "../../components/flashcard-deck";
import { SRS } from "../../SRS";
import BackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    backgroundColor: "#e3e3e3",
  },
  card: {
    margin: "auto",
    width: 600,
    maxWidth: "100%",
  },
  studyButton: {
    flexGrow: 1,
    margin: 15,
  },
});

const FlashcardsPage: FC<PageProps> = () => {
  const c = useStyles();
  const [s, setS] = useState("select");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  function toggleGroup(group: string) {
    if (selectedGroups.includes(group)) {
      setSelectedGroups([...selectedGroups.filter(id => id !== group)]);
    } else {
      setSelectedGroups([...selectedGroups, group]);
    }
  }

  function toggleAll() {
    if (selectedGroups.length === SRS.getGroups().length) {
      setSelectedGroups([]);
    } else {
      setSelectedGroups(SRS.getGroups().map(g => g.id));
    }
  }

  function select() {
    return (
      <div className={c.wrapper}>
        <Card className={c.card}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Pick what to study
            </Typography>
            <List>
              <ListItem>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedGroups.length === SRS.getGroups().length}
                      onChange={() => toggleAll()}
                      color="primary"
                    />
                  }
                  label="Everything!"
                />
              </ListItem>
              <Divider />
              {SRS.getGroups().map(group => (
                <ListItem key={group.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedGroups.includes(group.id)}
                        onChange={() => toggleGroup(group.id)}
                        color="secondary"
                      />
                    }
                    label={group.name}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setS("cards")}
              size="large"
              className={c.studyButton}
            >
              Study!
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }

  function cards() {
    return (
      <div>
        <FlashcardDeck
          deck={SRS.getFlashcardsFor(selectedGroups)}
          name="Study"
        ></FlashcardDeck>
      </div>
    );
  }

  return (
    <main>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() => navigate("/my")}
          >
            <BackIcon />
          </IconButton>
          <Typography variant="h6">Study</Typography>
        </Toolbar>
      </AppBar>
      {s === "select" ? (
        select()
      ) : s === "cards" ? (
        cards()
      ) : (
        <h1>Invalid state.</h1>
      )}
    </main>
  );
};

export default FlashcardsPage;
