import React, { Component } from "react";
import { IconButton, makeStyles, styled } from "@material-ui/core";
import AudioIcon from "@material-ui/icons/VolumeUp";

interface FlashcardCardProps {
  data: {
    [prop: string]: string;
  };
  front: string[];
  back: string[];
  advanceDirection: number;
  role: number;
}

interface FlashcardCardState {
  side: number;
  currentAudio: string;
}

export class FlashcardCard extends Component<
  FlashcardCardProps,
  FlashcardCardState
> {
  audio = new Audio();

  constructor(props) {
    super(props);

    this.state = { side: 0, currentAudio: "" };
  }

  formatDisplay(value: string) {
    const d = value.split(";")[0];
    const c = d.split(",").join(", ");
    return c;
  }

  playAudio() {
    const audioBucket =
      "https://storage.googleapis.com/japanese.danielnoon.info/audio";
    const audioFolder = this.props.data["&AUDIO_PREFIX"];
    const filename = this.props.data["&AUDIO_FILENAME"];

    const url = `${audioBucket}/${audioFolder}/${filename}.mp3`;

    this.audio.src = url;
    this.audio.play();
  }

  render() {
    const front = this.props.front.map(e => this.props.data[e]);
    const back = this.props.back.map(e => this.props.data[e]);
    return (
      <div
        className={`card side-${this.state.side} direction-${this.props.advanceDirection} role-${this.props.role}`}
        onClick={() =>
          this.setState(({ side }) => ({ side: side === 1 ? 0 : 1 }))
        }
      >
        <div className="card-inner">
          <div className="front">
            {front.map((entry, i) => (
              <h1 className="entry" key={i}>
                {this.formatDisplay(entry)}
              </h1>
            ))}
            <IconButton
              onClick={ev => void ev.stopPropagation() || this.playAudio()}
            >
              <AudioIcon />
            </IconButton>
          </div>
          <div className="back">
            {back.map((entry, i) => (
              <h1 className="entry" key={i}>
                {this.formatDisplay(entry)}
              </h1>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
