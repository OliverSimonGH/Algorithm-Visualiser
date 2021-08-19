import React, { Component } from 'react'
import Node from './Node';

export default class PathFinding extends Component {
    state = {
        width: 20,
        height: 10,
        blockSize: 30
    }

    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    render() {
        const { width, height, blockSize } = this.state;
        const mapCoords = {
            startX: this.getRandomInt(0, (width / 2) - 1),
            startY: this.getRandomInt(1, height - 1),
            endX: this.getRandomInt(width / 2, width - 1),
            endY: this.getRandomInt(0, height - 1),
        }
    
        console.log(mapCoords)
        let items = [];
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                items.push({
                    x: i * blockSize, 
                    y: j * blockSize,
                    start: i === mapCoords.startX && j === mapCoords.startY,
                    end: i === mapCoords.endX && j === mapCoords.endY,
                })
            }
            
        }
        return (
            <div className="ow">
                <div className="pt-container" style={{width: width * blockSize}}>
                    {items.length && items.map((val, key) => {
                        return <Node x={val.x} y={val.y} start={val.start} end={val.end} key={key}></Node>
                    })}        
                </div>
            </div>
        )
    }
}
