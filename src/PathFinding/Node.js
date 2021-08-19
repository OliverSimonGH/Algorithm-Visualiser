import React, { Component } from 'react'

export default class Node extends Component {
    render() {
        const { x, y, start, end } = this.props;
        const addColour = end ? "pt-end" : start ? "pt-start" : "";  

        return (
            <div className={`pt-block ${addColour}`} style={{ left: `${x}px`,  top: `${y}px`}}></div>
        )
    }
}
