import React, { Component } from "react";
import { FlashcardCard } from "./flashcard-card";

import "./flashcards.css";
import { FlashcardSettingsModal } from "./flashcard-settings-modal";

interface FlashcardDeckProps {
  deck: {
    [prop: string]: string;
  }[];
  name: string;
}

interface FlashcardDeckState {
  index: number;
  front: string[];
  back: string[];
  deck: {
    [prop: string]: string;
  }[];
  showSettings: boolean;
}

export class FlashcardDeck extends Component<
  FlashcardDeckProps,
  FlashcardDeckState
> {
  constructor(props) {
    super(props);

    const fields = Object.keys(this.props.deck[0]);
    const front = fields.includes("FRONT")
      ? this.props.deck[0]["FRONT"].split(",")
      : [fields[0]];
    const back = fields.includes("BACK")
      ? this.props.deck[0]["BACK"].split(",")
      : [fields[1]];

    this.state = {
      index: 0,
      front,
      back,
      deck: this.props.deck,
      showSettings: false,
    };
  }

  shuffleCards() {
    const d = this.state.deck.slice();

    for (let i = d.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = d[i];
      d[i] = d[j];
      d[j] = temp;
    }

    this.setState({ deck: d, index: 0 });
  }

  toggleSelected(side: "front" | "back", field: string) {
    if (this.state[side].includes(field)) {
      const tmp = this.state[side].filter(el => el !== field);
      this.setState({ [side]: tmp } as any);
    } else {
      const tmp = [...this.state[side], field];
      this.setState({ [side]: tmp } as any);
    }
  }

  dismissModal() {
    this.setState({ showSettings: false });
  }

  render() {
    const availableFields = Object.keys(this.state.deck[0]).filter(
      v => !["FRONT", "BACK"].includes(v)
    );

    return (
      <div className="deck-wrapper">
        <h1 className="deck-name">{this.props.name}</h1>
        <div className="control-buttons">
          <button
            className="icon-button card-control-button card-shuffle-button"
            onClick={() => this.shuffleCards()}
          >
            <i className="icon">shuffle</i>
          </button>
          <button
            className="icon-button card-control-button card-settings-button"
            onClick={() => this.setState({ showSettings: true })}
          >
            <i className="icon">settings</i>
          </button>
        </div>
        <div className="card-control-area">
          <div>
            <button
              className="card-prev-btn"
              onClick={() => this.setState({ index: this.state.index - 1 })}
              disabled={this.state.index <= 0}
            >
              <i className="icon md-36">chevron_left</i>
            </button>
          </div>
          <div className="card-wrapper">
            <FlashcardCard
              back={this.state.back}
              front={this.state.front}
              data={this.state.deck[this.state.index]}
            ></FlashcardCard>
          </div>
          <div>
            <button
              className="card-next-btn"
              onClick={() => this.setState({ index: this.state.index + 1 })}
              disabled={this.state.index >= this.props.deck.length - 1}
            >
              <i className="icon md-36">chevron_right</i>
            </button>
          </div>
        </div>
        <div className="mobile-controls">
          <button
            className="mobile-button-left"
            onClick={() => this.setState({ index: this.state.index - 1 })}
            disabled={this.state.index <= 0}
          >
            <i className="icon md-36">chevron_left</i>
          </button>
          <button
            className="mobile-button-right"
            onClick={() => this.setState({ index: this.state.index + 1 })}
            disabled={this.state.index >= this.props.deck.length - 1}
          >
            <i className="icon md-36">chevron_right</i>
          </button>
        </div>
        <FlashcardSettingsModal
          availableFields={availableFields}
          front={this.state.front}
          back={this.state.back}
          show={this.state.showSettings}
          toggleSelected={(side, field) => this.toggleSelected(side, field)}
          onDismiss={() => this.dismissModal()}
        />
      </div>
    );
  }
}
