import React, { Component, Fragment } from "react";
import VisualizeArray from "../../Comp/VisualArray/VisualizeArray";
import BuildControls from "../../Comp/BuildControls/BuildControls";
import Modal from "../../Comp/UI/Modal/Modal";
import InputError from "../../Comp/InputErrors/InputError";
import axios from "axios";
import { MAX_BAR } from "./constants";
const algoNames = ["Naive Sort", "Bubble Sort", "Quick Sort", "Merge Sort"];

class ArrayBuilder extends Component {
  state = {
    array: [1, 4, 5, 6, 2, 12, 13, 16, 7, 2, 9, 7, 8, 9, 12, 1, 5, 7],
    valError: false,
    removeError: false,
    chosenAlgo: -1,
    clickRunAlgo: false,
    runningAlgo: false,
    mustChooseAlgo: false,
    currentActions: { action: [], marked: false },
    sliderVal: 150
  };

  chooseAlgo = chosenIndex => {
    if (!this.state.runningAlgo) {
      const parsedIndex = parseInt(chosenIndex);
      const prevIndex = this.state.chosenAlgo;
      this.setState({
        chosenAlgo: parsedIndex === prevIndex ? -1 : parsedIndex
      });
    }
  };

  handleInputVal = event => (this.currValToAdd = event.target.value);

  handleConfirmAdd = e => {
    if (!this.state.runningAlgo) {
      const currVal = parseInt(this.currValToAdd);

      if (e.key === undefined || e.key === "Enter") {
        if (isNaN(currVal) || currVal < 0 || currVal > MAX_BAR) {
          this.setState({ valError: true });
        } else {
          let newArray = this.state.array.slice();
          newArray.push(currVal);
          this.setState({ array: newArray, valError: false });
        }
      }
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

  sliderHandler = event => {
    if (!this.state.runningAlgo)
      this.setState({ sliderVal: event.target.value });
  };
  randomArray = () => {
    if (!this.state.runningAlgo) {
      const array = [];
      for (var i = 0; i < 30; i++) array[i] = Math.floor(25 * Math.random());
      this.setState({ array: array });
    }
  };
  addControls = () => (
    <div>
      <BuildControls
        randomHandler={this.randomArray}
        addHandler={this.handleInputVal}
        addConfirmHandler={this.handleConfirmAdd}
        algoClickHandler={this.chooseAlgo}
        currAlgoIndex={this.state.chosenAlgo}
        clickRunHandler={this.clickRunAlgo}
        algoNames={algoNames}
        sliderValue={this.state.sliderVal}
        sliderHandler={this.sliderHandler}
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
    if (!this.state.runningAlgo) {
      let newArray = this.state.array.slice();
      newArray.splice(indexToRemove, 1);
      this.setState({ array: newArray, removeError: false });
    }
  };

  clickRunAlgo = () => {
    if (!this.state.runningAlgo) this.setState({ clickRunAlgo: true });
  };

  render() {
    return (
      <div>
        {this.addModalErrors()}
        {this.addVisualizedArray()}
        {this.addControls()}
      </div>
    );
  }

  startActions = actions => {
    if (this.state.chosenAlgo !== -1 && actions.length > 0) {
      this.actions = actions.slice();
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
          .post("https://us-central1-cs-server-fe37c.cloudfunctions.net/api/", {
            array: this.state.array,
            algo: this.state.chosenAlgo,
            isArray: true
          })
          .then(repsonse => {
            this.startActions(repsonse.data);
          })
          .catch(error => console.log("ERROR"));
      }
    }
    if (this.state.runningAlgo) {
      setTimeout(() => this.runIteration(), this.state.sliderVal);
    }
  }
}

export default ArrayBuilder;
