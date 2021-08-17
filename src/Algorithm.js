import React, { Component } from "react";
import { Button } from "react-bootstrap";

const ANIMATION_SPEED = 25;

export default class Algorithm extends Component {
  state = {
    array: [],
    arraySize: 50,
    buttonsEnabled: false,
  };

  componentDidMount() {
    this.generateArray();
  }

  disableButtons = () => {
		this.setState({buttonsEnabled: true})
	};

  randNum = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  generateArray = () => {
    let temp = [];
    for (let i = 0; i < this.state.arraySize; i++) {
      temp.push(this.randNum());
    }
    this.setState({ 
			array: temp,
			buttonsEnabled: false 
		});
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

  partition = (arr, l, h) => {
    let animations = [];
    let pivot = arr[h];
    let i = l;

    for (let j = l; j < h; j++) {
      if (arr[j] <= pivot) {
        animations.push([j, i]);
        animations.push([j, i]);
        [arr[i], arr[j]] = [arr[j], arr[i]];

        i++;
      }
    }

    animations.push([h, i]);
    animations.push([h, i]);
    [arr[i], arr[h]] = [arr[h], arr[i]];

    return [i, animations];
  };

  insertionSort = () => {
		this.disableButtons();
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
		this.disableButtons();
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
		this.disableButtons();

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

  quicksort = () => {
		this.disableButtons();
    let arr = [...this.state.array];
    let animations = [];

    let stack = [];

    let start = 0;
    let end = arr.length - 1;

    stack.push({ x: start, y: end });

    while (stack.length) {
      const { x, y } = stack.shift();

      let pivot = this.partition(arr, x, y);

      animations = [...animations, ...pivot[1]];

      if (pivot[0] - 1 > x) {
        stack.push({ x: x, y: pivot[0] - 1 });
      }

      if (pivot[0] + 1 < y) {
        stack.push({ x: pivot[0] + 1, y: y });
      }
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
            className="dis" 
						disabled={this.state.buttonsEnabled}
          >
            Heap Sort
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => this.bubbleSort()}
            style={{ marginRight: 10 }}
            className="dis"
						disabled={this.state.buttonsEnabled}
          >
            Bubble Sort
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => this.insertionSort()}
            style={{ marginRight: 10 }}
            className="dis"
						disabled={this.state.buttonsEnabled}
          >
            Insertion Sort
          </Button>
          <Button
            variant="outline-dark"
            className="dis"
            onClick={() => this.quicksort()}
						disabled={this.state.buttonsEnabled}
          >
            Quick Sort
          </Button>
        </div>
      </div>
    );
  }
}
