import React, { Component } from 'react'
import { Button } from "react-bootstrap"

const ANIMATION_SPEED = 10;

export default class Algorithm extends Component {

    state = {
        array: [],
        arraySize: 50
    }

    componentDidMount(){
        this.generateArray()
    }

    randNum = () => {
        return Math.floor(Math.random() * 100) + 1
    }

    generateArray = () => {
        let temp = []
        for (let i=0; i < this.state.arraySize; i++) {
            temp.push(this.randNum())
        }
        this.setState({array: temp})
    }

    swapAnimation = (animations) => {
        for (let j=0; j < animations.length; j++){
            const one = animations[j][0];
            const two = animations[j][1];
            let bars = document.getElementsByClassName("algorithmBar");

            if (j % 2 === 0){
                setTimeout(() => {
                    bars[one].style.backgroundColor = "red";
                    bars[two].style.backgroundColor = "red";
                }, j * ANIMATION_SPEED);
            }
            else {
                setTimeout(() => {
                    bars[one].style.backgroundColor = "black";
                    bars[two].style.backgroundColor = "black";

                    let new_temp = [...this.state.array];
                    let swap_one = new_temp[one];
                    new_temp[one] = new_temp[two];
                    new_temp[two] = swap_one;

                    this.setState({array: new_temp})
                }, j * ANIMATION_SPEED); 
            }
        }
    }

    insertionSort = () => {
        let temp = [...this.state.array]
        let animations = []

        for (let i=1; i < temp.length; i++){
            let index = temp[i];
            let j = i - 1;

            while (j >= 0 && temp[j] > index){
                animations.push([j + 1, j])
                animations.push([j + 1, j])
                temp[j + 1] = temp[j];
                j--;
            }
            temp[j + 1] = index
        }

        this.swapAnimation(animations);
      
    }

    bubbleSort = () => {
        let temp = [...this.state.array]
        let animations = []

        for(let i=0; i < temp.length - 1; i++){
            for(let j=0; j < temp.length - i - 1; j++){
                if (temp[j] > temp[j + 1]){
                    animations.push([j + 1, j])
                    animations.push([j + 1, j])
                    let tempVal = temp[j];
                    temp[j] = temp[j + 1];
                    temp[j + 1] = tempVal;
                }
            } 
        }

        this.swapAnimation(animations);
    }

    buildMaxHeap = (array, len) => {
        let new_animations = []

        for(let i = 1; i < len; i++){
            if(array[i] > array[(i - 1) / 2]){
                let j = i;

                while (array[j] > array[(j - 1) / 2]){
                    new_animations.push([array[j], array[(j - 1) / 2]]);
                    new_animations.push([array[j], array[(j - 1) / 2]]);

                    let temp = array[j];
                    array[j] = array[(j - 1) / 2];
                    array[(j - 1) / 2] = temp;

                    j = (j - 1) / 2;
                }
            }
        }

        return new_animations;
    }

    heapSort = () => {
        let new_animations = [];

        let temp = [...this.state.array] ;
        let n = temp.length;

        let moreAnimations = this.buildMaxHeap(temp, n);
        new_animations = moreAnimations;

        for (let i = n - 1; i > 0; i--){
            new_animations.push([temp[i], temp[0]]);
            new_animations.push([temp[i], temp[0]]);

            let swap = temp[0];
            temp[0] = temp[i];
            temp[i] = swap;

            let j = 0;
            let index = 0;

            do {
                index = (2 * j + 1);

                if(temp[index] < temp[index + 1] && index < (i - 1)){
                    index++;
                }

                if(temp[j] < temp[index] && index < i){
                    new_animations.push([temp[index], temp[j]]);
                    new_animations.push([temp[index], temp[j]]);

                    let swap = temp[j];
                    temp[j] = temp[index];
                    temp[index] = swap;
                }
                j = index;

            } while (index < i);
        }
        
        console.log(temp)
        console.log(new_animations)
        // this.swapAnimation(new_animations);
    }

    render() {
        return (
            <div className="mainContainer">
            <div className="algorithmContainer">
                {this.state.array.map((bar, key) => {
                    return <div className="algorithmBar" style={{height:bar * 3}} key={key} value={bar}></div>
                })}
            </div>
            <div className="algorithmButtons">
                <Button variant="outline-dark" onClick={() => this.generateArray()} style={{marginRight: 10}}>Generate Array</Button>
                <Button variant="outline-dark" onClick={() => this.heapSort()} style={{marginRight: 10}}>Heap Sort</Button>
                <Button variant="outline-dark" onClick={() => this.bubbleSort()} style={{marginRight: 10}}>Bubble Sort</Button>
                <Button variant="outline-dark" onClick={() => this.insertionSort()}>Insertion Sort</Button>
            </div>
            </div>
            
        )
    }
}
