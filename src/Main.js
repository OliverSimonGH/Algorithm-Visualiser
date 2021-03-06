import React, { Component } from "react";
import { Navbar, Container, Nav} from "react-bootstrap"

import Algorithm from "./Algorithm";
import PathFinding from "./PathFinding/PathFinding";

const ALGORITHMS = {
  "SORTING": "Sorting",
  "PATH_FINDING": "Path Finding"
}

export default class Main extends Component {
  state = {
    alogirthms: [
        ALGORITHMS.SORTING,
        ALGORITHMS.PATH_FINDING
    ],
    selectedAlgorithm: ALGORITHMS.PATH_FINDING
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
        {this.state.selectedAlgorithm === ALGORITHMS.SORTING && <Algorithm></Algorithm>}
        {this.state.selectedAlgorithm === ALGORITHMS.PATH_FINDING && <PathFinding></PathFinding>}
      </React.Fragment>
    );
  }
}

