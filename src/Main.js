import React, { Component } from "react";
import { Navbar, Container, Nav} from "react-bootstrap"

import Algorithm from "./Algorithm";

export default class Main extends Component {
  state = {
    alogirthms: [
        "Merge Sort",
        "Quick Sort",
        "Heap Sort",
        "Bubble Sort",
        "Insertion Sort"
    ],
    selectedAlgorithm: null
  };

  selectAlgorithm = (algo) => {
    this.setState({
        selectedAlgorithm: algo
    })
  }

  render() {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Alogrithm Visualiser</Navbar.Brand>
            <Nav className="me-auto">
                {this.state.alogirthms.map(algo => {
                    return <Nav.Link onClick={() => this.selectAlgorithm(algo)}>{algo}</Nav.Link>
                })}
            </Nav>
          </Container>
        </Navbar>
        <Algorithm selectedAlgorithm={this.state.selectedAlgorithm}></Algorithm>
      </React.Fragment>
    );
  }
}
