import React, { Component } from "react";
import { Button } from "react-bootstrap";

const ANIMATION_SPEED = 100;

export default class Algorithm extends Component {
  state = {
    array: [],
    arraySize: 50,
  };

  componentDidMount() {
    this.generateArray();
  }

  randNum = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  generateArray = () => {
    let temp = [];
    for (let i = 0; i < this.state.arraySize; i++) {
      temp.push(this.randNum());
    }
    this.setState({ array: temp });
  };

  swapAnimation = (animations) => {
    for (let j = 0; j < animations.length; j++) {
      const one = animations[j][0];
      const two = animations[j][1];
      let bars = document.getElementsByClassName("algorithmBar");

      if (j % 2 === 0) {
        setTimeout(() => {
          bars[one].style.backgroundColor = "red";
          bars[two].style.backgroundColor = "red";
        }, j * ANIMATION_SPEED);
      } else {
        setTimeout(() => {
          bars[one].style.backgroundColor = "black";
          bars[two].style.backgroundColor = "black";

          let new_temp = [...this.state.array];
          let swap_one = new_temp[one];
          new_temp[one] = new_temp[two];
          new_temp[two] = swap_one;

          this.setState({ array: new_temp });
        }, j * ANIMATION_SPEED);
      }
    }
  };

  insertionSort = () => {
    let temp = [...this.state.array];
    let animations = [];

    for (let i = 1; i < temp.length; i++) {
      let index = temp[i];
      let j = i - 1;

      while (j >= 0 && temp[j] > index) {
        animations.push([j + 1, j]);
        animations.push([j + 1, j]);
        temp[j + 1] = temp[j];
        j--;
      }
      temp[j + 1] = index;
    }

    this.swapAnimation(animations);
  };

  bubbleSort = () => {
    let temp = [...this.state.array];
    let animations = [];

    for (let i = 0; i < temp.length - 1; i++) {
      for (let j = 0; j < temp.length - i - 1; j++) {
        if (temp[j] > temp[j + 1]) {
          animations.push([j + 1, j]);
          animations.push([j + 1, j]);

          [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
        }
      }
    }

    this.swapAnimation(animations);
  };

  heapSort = () => {
    let animations = [];

    let arr = [...this.state.array];
    let n = arr.length;

    for (let i = 1; i < n; i++) {
      if (arr[i] > arr[parseInt((i - 1) / 2)]) {
        let j = i;

        while (arr[j] > arr[parseInt((j - 1) / 2)]) {
          const l = j;
          const r = parseInt((j - 1) / 2);

          animations.push([r, l]);
          animations.push([r, l]);
          [arr[l], arr[r]] = [arr[r], arr[l]];

          j = parseInt((j - 1) / 2);
        }
      }
    }

    for (let i = n - 1; i > 0; i--) {
      animations.push([i, 0]);
      animations.push([i, 0]);
      [arr[0], arr[i]] = [arr[i], arr[0]];

      let j = 0,
        index;

      do {
        index = 2 * j + 1;

        if (index < i - 1 && arr[index] < arr[index + 1]) {
          index++;
        }

        if (index < i && arr[j] < arr[index]) {
          animations.push([index, j]);
          animations.push([index, j]);
          [arr[j], arr[index]] = [arr[index], arr[j]];
        }

        j = index;
      } while (index < i);
    }

    this.swapAnimation(animations);
  };

  
  render() {
    return (
      <div className="mainContainer">
        <div className="algorithmContainer">
          {this.state.array.map((bar, key) => {
            return (
              <div
                className="algorithmBar"
                style={{ height: bar * 3 }}
                key={key}
                value={bar}
              ></div>
            );
          })}
        </div>
        <div className="algorithmButtons">
          <Button
            variant="outline-dark"
            onClick={() => this.generateArray()}
            style={{ marginRight: 10 }}
          >
            Generate Array
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => this.heapSort()}
            style={{ marginRight: 10 }}
          >
            Heap Sort
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => this.bubbleSort()}
            style={{ marginRight: 10 }}
          >
            Bubble Sort
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => this.insertionSort()}
            style={{ marginRight: 10 }}
          >
            Insertion Sort
          </Button>
          <Button variant="outline-dark" onClick={() => this.quicksort()}>
            Quick Sort
          </Button>
        </div>
      </div>
    );
  }
}
