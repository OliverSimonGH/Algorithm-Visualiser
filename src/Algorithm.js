import React, { Component } from "react";
import { Button } from "react-bootstrap";

import {
  insertionSortAnimations,
  bubbleSortAnimations,
  quickSortAnimations,
  heapSortAnimations,
  mergeSortAnimations,
  ANIMATION_TYPE
} from "./Animations";

export default class Algorithm extends Component {
  state = {
    array: [],
    arraySize: 50,
    buttonsEnabled: false,
    timeouts: [],
    animationSpeed: 5,
    tempSpeed: 5
  };

  componentDidMount() {
    this.generateArray();
  }

  disableButtons = (val) => {
    this.setState({ buttonsEnabled: true });

    if (val > 0) {
      new Promise((res, rej) => {
        setTimeout(() => {
          res();
        }, val);
      }).then(() => {
        this.setState({ buttonsEnabled: false });
      });
    }
  };

  randNum = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  generateArray = () => {
    let temp = [];
    let arrSize = this.state.arraySize;

    if (arrSize < 10) arrSize = 10;
    else if (arrSize > 200) arrSize = 200;

    for (let i = 0; i < arrSize; i++) {
      temp.push(this.randNum());
    }

    this.setState({
      array: temp,
      arraySize: arrSize,
      buttonsEnabled: false,
    });
  };

  arraySizeInputChange = (value) => {
    if (value === "") {
      return this.setState({ arraySize: 1 });
    }

    this.setState({
      arraySize: value,
    });
  };

  animationInputChange = (value) => {
    if (value === "") {
      return this.setState({ tempSpeed: 1 });
    }

    this.setState({
      tempSpeed: value,
    });
  };

  animationSpeed = () => {
    let speed = this.state.tempSpeed;

    if (speed < 1) speed = 1;
    else if (speed > 100) speed = 100;
    
    this.setState({
      animationSpeed: speed,
      tempSpeed: speed
    })
  }

  inOrder = () => {
    var temp = [...this.state.array];

    for (let i = 0; i < temp.length - 1; i++) {
      let current = temp[i];
      let next = temp[i + 1];

      if (current > next) {
        return false;
      }
    }

    return true;
  };

  swapAnimation = (animations, callback = null) => {
    let disableButtonLength = animations.length * this.state.animationSpeed;
    this.disableButtons(disableButtonLength);

    if (callback === null) {
      for (let j = 0; j < animations.length; j++) {
        const one = animations[j][0];
        const two = animations[j][1];
        let bars = document.getElementsByClassName("algorithmBar");

        if (callback === null) {
          if (j % 2 === 0) {
            setTimeout(() => {
              bars[one].style.backgroundColor = "red";
              bars[two].style.backgroundColor = "red";
            }, j * this.state.animationSpeed);
          } else {
            setTimeout(() => {
              console.log(one, two)
              bars[one].style.backgroundColor = "black";
              bars[two].style.backgroundColor = "black";

              let new_temp = [...this.state.array];
              let swap_one = new_temp[one];
              new_temp[one] = new_temp[two];
              new_temp[two] = swap_one;

              this.setState({ array: new_temp });
            }, j * this.state.animationSpeed);
          }
        }
      }
    } else {
      callback(animations);
    }
  };

  insertionSort = () => {
    if (this.inOrder()) return;
    let arr = [...this.state.array];
    let animations = insertionSortAnimations(arr);
    this.swapAnimation(animations);
  };

  bubbleSort = () => {
    if (this.inOrder()) return;
    let arr = [...this.state.array];
    let animations = bubbleSortAnimations(arr);
    this.swapAnimation(animations);
  };

  heapSort = () => {
    if (this.inOrder()) return;
    let arr = [...this.state.array];
    let animations = heapSortAnimations(arr);
    this.swapAnimation(animations);
  };

  quicksort = () => {
    if (this.inOrder()) return;
    let arr = [...this.state.array];
    let animations = quickSortAnimations(arr);
    this.swapAnimation(animations);
  };


  mergeSort = () => {
    if (this.inOrder()) return;
    let arr = [...this.state.array];
    let animations = mergeSortAnimations(arr);

    this.swapAnimation(animations, (an, t) => {
      for (let j = 0; j < an.length; j++) {
        const one = an[j][0];
        const two = an[j][1];
        const anType = an[j][2];

        let bars = document.getElementsByClassName("algorithmBar");

        if (ANIMATION_TYPE.RED === anType) {
          setTimeout(() => {
            bars[one].style.backgroundColor = "red";
            bars[two].style.backgroundColor = "red";
          }, j * this.state.animationSpeed);
        } else if (ANIMATION_TYPE.BLACK === anType) {
          setTimeout(() => {
            bars[one].style.backgroundColor = "black";
            bars[two].style.backgroundColor = "black";
          }, j * this.state.animationSpeed);
        } else {
          setTimeout(() => {
            let new_temp = [...this.state.array];
            new_temp[one] = two;
            this.setState({ array: new_temp });
          }, j * this.state.animationSpeed);
        }
      }
    });
  };

  render() {
    let measure = [];
    for (let i = 0; i <= 20; i++) {
      measure.push(<div className="measure-sidebar-layout" style={{top: `calc(${((20 - i) * 5)}% - 3px)`}}><div className="measure-sidebar"></div><div className="measure-sidebarnum">{i * 5}</div></div>)
    }

    return (
      <div className="mainContainer">
        <div className="ac">
        <div className="algorithmContainer">
          {this.state.arraySize &&
            this.state.array.map((bar, key) => {
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
        <div className="measure">
          <div className="measure-bar">
            {measure.length && measure.map((value) => {
              return value
            })}
          </div>
        </div>
        </div>
        <div className="buttons">
          <div className="button-spacing">
            <div>
            <Button
              variant="outline-dark algorithmButtons"
              onClick={() => this.generateArray()}
              style={{ marginRight: 10, marginTop: 20 }}
              disabled={this.state.buttonsEnabled}
            >
              Generate Array
            </Button>

            <input
              type="number"
              class="btn btn-outline-dark custom-input algorithmButtons"
              placeholder={this.state.arraySize}
              value={this.state.arraySize}
              onChange={(e) => this.arraySizeInputChange(e.target.value)}
            ></input>
            </div>

            <div>
            <Button
              variant="outline-dark algorithmButtons"
              onClick={() => this.animationSpeed()}
              style={{ marginRight: 10, marginTop: 20 }}
              disabled={this.state.buttonsEnabled}
            >
              Animation Speed
            </Button>

            <input
              type="number"
              class="btn btn-outline-dark custom-input algorithmButtons"
              placeholder={this.state.tempSpeed}
              value={this.state.tempSpeed}
              onChange={(e) => this.animationInputChange(e.target.value)}
            ></input>
            </div>

          </div>
          <div className="button-center">
            <Button
              variant="outline-dark algorithmButtons"
              onClick={() => this.heapSort()}
              style={{ marginRight: 10 }}
              className="dis"
              disabled={this.state.buttonsEnabled}
            >
              Heap Sort
            </Button>
            <Button
              variant="outline-dark algorithmButtons"
              onClick={() => this.bubbleSort()}
              style={{ marginRight: 10 }}
              className="dis"
              disabled={this.state.buttonsEnabled}
            >
              Bubble Sort
            </Button>
            <Button
              variant="outline-dark algorithmButtons"
              onClick={() => this.insertionSort()}
              style={{ marginRight: 10 }}
              className="dis"
              disabled={this.state.buttonsEnabled}
            >
              Insertion Sort
            </Button>
            <Button
              variant="outline-dark algorithmButtons"
              className="dis"
              onClick={() => this.quicksort()}
              style={{ marginRight: 10 }}
              disabled={this.state.buttonsEnabled}
            >
              Quick Sort
            </Button>
            <Button
              variant="outline-dark algorithmButtons"
              className="dis"
              onClick={() => this.mergeSort()}
              disabled={this.state.buttonsEnabled}
            >
              Merge Sort
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
