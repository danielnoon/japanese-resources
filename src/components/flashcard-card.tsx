import React, { Component } from "react";

interface FlashcardCardProps {
  data: {
    [prop: string]: string;
  };
  front: string[];
  back: string[];
}

interface FlashcardCardState {
  side: number;
}

export class FlashcardCard extends Component<
  FlashcardCardProps,
  FlashcardCardState
> {
  constructor(props) {
    super(props);

    this.state = { side: 0 };
  }

  formatDisplay(value: string) {
    const d = value.split(";")[0];
    const c = d.split(",").join(", ");
    return c;
  }

  render() {
    const front = this.props.front.map(e => this.props.data[e]);
    const back = this.props.back.map(e => this.props.data[e]);
    return (
      <div
        className={`card side-${this.state.side}`}
        onClick={() => this.setState({ side: this.state.side === 0 ? 1 : 0 })}
      >
        <div className="card-inner">
          <div className="front">
            {front.map((entry, i) => (
              <h1 className="entry" key={i}>
                {this.formatDisplay(entry)}
              </h1>
            ))}
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
