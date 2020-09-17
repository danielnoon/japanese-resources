import React, { Component } from "react";
import { SRS, StudyItem } from "../../SRS";
import {
  Theme,
  withStyles,
  createStyles,
  WithStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import { navigate } from "gatsby";
import BackIcon from "@material-ui/icons/ArrowBack";
import WanakanaInput from "react-wanakana";

const styles = (theme: Theme) =>
  createStyles({
    wrapper: {
      display: "flex",
      position: "absolute",
      height: "100%",
      width: "100%",
      top: 0,
      left: 0,
    },
    content: {
      marginTop: 64,
    },
  });

interface Props extends WithStyles<typeof styles> {}

interface State {
  queue: StudyItem[];
  currentItem: StudyItem;
  inProgress: boolean;
  input: string;
  state: "learn" | "quiz";
  learnCount: number;
  quizState: "success" | "failure" | "normal";
  incorrect: Map<string, number>;
}

class LessonsPage extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      queue: [],
      currentItem: null,
      inProgress: true,
      input: "",
      quizState: "normal",
      incorrect: new Map(),
      learnCount: 0,
      state: "learn",
    };
  }

  componentDidMount() {
    const queue = SRS.getLessons();
    this.setState({ queue, currentItem: queue.pop() });
  }

  submit(key: string) {
    if (key === "Enter") {
      const currentItem = this.state.currentItem;

      if (
        currentItem.reviews[0].solution.value.some(review =>
          review.includes(this.state.input)
        )
      ) {
        console.log("Correct!");
        const queue = this.state.queue.slice();
        // this.learned
      } else {
        console.log("Incorrect :(");
      }
    }
  }

  render() {
    const c = this.props.classes;
    const item = this.state.currentItem;

    return (
      <div className={c.wrapper}>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              onClick={() => navigate("/my")}
            >
              <BackIcon />
            </IconButton>
            <Typography variant="h6">Lessons</Typography>
          </Toolbar>
        </AppBar>
        {this.state.queue.length > 0 && (
          <div className={c.content}>
            <Typography variant="h2">
              {item.reviews[0].present[0].slice(0, 3).join(", ")}
            </Typography>
            <WanakanaInput
              name="response"
              value={this.state.input}
              to={
                item.reviews[0].solution.flags.includes("ime")
                  ? "kana"
                  : "romaji"
              }
              onKeyDown={e => this.submit(e.key)}
              onChange={e => this.setState({ input: e.target.value })}
            ></WanakanaInput>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LessonsPage);
