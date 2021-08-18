import React, { Component } from "react";
import { Button } from "react-bootstrap";

import { 
  insertionSortAnimations, 
  bubbleSortAnimations, 
  quickSortAnimations, 
  heapSortAnimations 
} from "./Animations"

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

  insertionSort = () => {
		this.disableButtons();
    let arr = [...this.state.array];
    let animations = insertionSortAnimations(arr);
    this.swapAnimation(animations);
  };

  bubbleSort = () => {
		this.disableButtons();
    let arr = [...this.state.array];
    let animations = bubbleSortAnimations(arr);
    this.swapAnimation(animations);
  };

  heapSort = () => {
		this.disableButtons();
    let arr = [...this.state.array];
    let animations = heapSortAnimations(arr);
    this.swapAnimation(animations);
  };

  quicksort = () => {
		this.disableButtons();
    let arr = [...this.state.array];
    let animations = quickSortAnimations(arr);
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
