import React, { Component, Fragment } from "react";
import VisualizeArray from "../../Comp/VisualArray/VisualizeArray";
import BuildControls from "../../Comp/BuildControls/BuildControls";
import Modal from "../../Comp/UI/Modal/Modal";
import InputError from "../../Comp/InputErrors/InputError";
import axios from "axios";

class ArrayBuilder extends Component {
  state = {
    array: [1, 4, 5, 6, 2, 12, 13, 16, 7, 2, 9, 7, 8, 9, 12, 1, 5, 7],
    valError: false,
    removeError: false,
    chosenAlgo: -1,
    clickRunAlgo: false,
    runningAlgo: false,
    mustChooseAlgo: false,
    currentActions: { action: [], marked: false }
  };

  chooseAlgo = chosenIndex => {
    const parsedIndex = parseInt(chosenIndex);
    const prevIndex = this.state.chosenAlgo;
    this.setState({ chosenAlgo: parsedIndex === prevIndex ? -1 : parsedIndex });
  };

  handleInputVal = event => (this.currValToAdd = event.target.value);

  handleRemoveIndex = event => (this.currIndexToRemove = event.target.value);

  handleConfirmAdd = e => {
    const currVal = parseInt(this.currValToAdd);

    if (e.key === undefined || e.key === "Enter") {
      if (isNaN(currVal) || currVal < 0 || currVal > 30) {
        this.setState({ valError: true });
      } else {
        let newArray = this.state.array.slice();
        newArray.push(currVal);
        this.setState({ array: newArray, valError: false });
      }
    }
  };
  handleConfirmedRemove = () => {
    const indexToRemove = parseInt(this.currIndexToRemove);
    if (
      isNaN(indexToRemove) ||
      indexToRemove < 0 ||
      indexToRemove >= this.state.array.length
    )
      this.setState({ removeError: true });
    else {
      let newArray = this.state.array.slice();
      newArray.splice(indexToRemove, 1);
      this.setState({ array: newArray, removeError: false });
    }
  };

  addModalErrors = () => (
    <Fragment>
      <Modal
        show={this.state.valError}
        backDropClick={() => this.backDropClick("valError")}
      >
        <InputError label={"Input value is Illegal"} />
      </Modal>
      <Modal
        show={this.state.removeError}
        backDropClick={() => this.backDropClick("removeError")}
      >
        <InputError label={"Remove index is Illegal"} />
      </Modal>
      <Modal
        show={this.state.mustChooseAlgo}
        backDropClick={() => this.backDropClick("mustChooseAlgo")}
      >
        <InputError label={"Choose an algorithm"} />
      </Modal>
    </Fragment>
  );

  addControls = () => (
    <div>
      <BuildControls
        addHandler={this.handleInputVal}
        addConfirmHandler={this.handleConfirmAdd}
        algoClickHandler={this.chooseAlgo}
        currAlgoIndex={this.state.chosenAlgo}
        clickRunHandler={this.clickRunAlgo}
      />
    </div>
  );

  addVisualizedArray = () => (
    <VisualizeArray
      array={this.state.array}
      removeBar={this.removeBarByClick}
      runningAlgo={this.state.runningAlgo}
      currentActions={this.state.currentActions}
    />
  );

  backDropClick = stateKey => {
    let newState = Object.assign({}, this.state);
    newState[stateKey] = false;
    this.setState(newState);
  };

  removeBarByClick = indexToRemove => {
    let newArray = this.state.array.slice();
    newArray.splice(indexToRemove, 1);
    this.setState({ array: newArray, removeError: false });
  };

  clickRunAlgo = () => {
    this.setState({ clickRunAlgo: true });
  };

  render() {
    return (
      <Fragment>
        {this.addModalErrors()}
        {this.addVisualizedArray()}
        {this.addControls()}
      </Fragment>
    );
  }

  startActions = actions => {
    if (this.state.chosenAlgo !== -1 && actions["Actions"].length > 0) {
      this.actions = actions["Actions"].slice();
      this.setState({ clickRunAlgo: false, runningAlgo: true });
    } else if (this.state.chosenAlgo === -1) {
      this.setState({ clickRunAlgo: false, mustChooseAlgo: true });
    } else {
      this.setState({ clickRunAlgo: false });
    }
  };

  swapArrayStateAt = (action, shouldStop) => {
    const i = action[0];
    const j = action[1];
    const array = this.state.array.slice();
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
    this.setState({
      array: array,
      runningAlgo: !shouldStop,
      currentActions: shouldStop ? null : this.state.currentActions
    });
  };

  runIteration() {
    const action = this.actions[0]["action"];
    const isMarked = this.actions[0]["marked"];
    if (isMarked) {
      this.actions.shift();
      this.swapArrayStateAt(action, this.actions.length === 0);
    } else {
      this.actions[0]["marked"] = true;
      this.setState({
        currentActions: { action: action, marked: !isMarked }
      });
    }
  }

  componentDidUpdate() {
    if (this.state.clickRunAlgo) {
      if (this.state.chosenAlgo === -1)
        this.setState({ clickRunAlgo: false, mustChooseAlgo: true });
      else {
        axios
          .post(
            "http://localhost:8080",
            JSON.stringify({
              array: this.state.array,
              algo: this.state.chosenAlgo
            })
          )
          .then(repsonse => this.startActions(repsonse.data))
          .catch(error => console.log(error));
      }
    }
    if (this.state.runningAlgo) {
      setTimeout(() => this.runIteration(), 150);
    }
  }
}

export default ArrayBuilder;
