import React from 'react';

type Props = {
    startTimeInSeconds: number;
}

type State = {
    timeRemainingInSeconds: number;
}

export class CountdownTimer extends React.Component<Props, State> {
    private timer: any;
  
    constructor(props: Props) {
      super(props);
      this.state = {
        timeRemainingInSeconds: props.startTimeInSeconds
      };
    }
  
    decrementTimeRemaining = () => {
      if (this.state.timeRemainingInSeconds > 0) {
        this.setState({
          timeRemainingInSeconds: this.state.timeRemainingInSeconds - 1
        });
      } else {
        clearInterval(this.timer!);
      }
    };
  
    componentDidMount() {
      this.timer = setInterval(() => {
        this.decrementTimeRemaining();
      }, 1000);
    }
  
    render() {
      return (
        <div className="countdown-timer">
          <div className="countdown-timer__text">
            {this.state.timeRemainingInSeconds}s
          </div>
        </div>
      );
    }
  }