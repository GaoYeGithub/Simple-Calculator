import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "./components/Button";
import * as math from "mathjs";

const operatorsArr = ["*", "/", "+", ".", "-"];

export default function App() {
  const [input, setInput] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (!isNaN(key) || key === ".") {
        inputNum(key);
      } else if (operatorsArr.includes(key)) {
        inputOperator(key);
      } else if (key === "Enter") {
        evaluate();
      } else if (key === "Backspace") {
        setInput(input.slice(0, -1));
      } else if (key === "Escape") {
        setInput("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input]);

  function inputNum(val) {
    setInput(input + val);
  }

  function inputOperator(val) {
    if (
      input === "" ||
      (operatorsArr.includes(input[input.length - 1]) &&
        operatorsArr.includes(val))
    ) {
      return;
    } else {
      setInput(input + val);
    }
  }

  function evaluate() {
    if (input === "" || operatorsArr.includes(input[input.length - 1])) {
      return input;
    } else {
      setInput(math.evaluate(input));
    }
  }

  return (
    <div className="App">
      <h1>React Calculator</h1>
      <div className="calc-wrapper">
        <Button isInput>{input}</Button>
        <div className="row">
          <Button onClick={inputNum}>7</Button>
          <Button onClick={inputNum}>8</Button>
          <Button onClick={inputNum}>9</Button>
          <Button onClick={inputOperator}>/</Button>
        </div>
        <div className="row">
          <Button onClick={inputNum}>4</Button>
          <Button onClick={inputNum}>5</Button>
          <Button onClick={inputNum}>6</Button>
          <Button onClick={inputOperator}>*</Button>
        </div>
        <div className="row">
          <Button onClick={inputNum}>1</Button>
          <Button onClick={inputNum}>2</Button>
          <Button onClick={inputNum}>3</Button>
          <Button onClick={inputOperator}>+</Button>
        </div>
        <div className="row">
          <Button onClick={inputOperator}>.</Button>
          <Button onClick={inputNum}>0</Button>
          <Button onClick={() => setInput("")}>C</Button>
          <Button onClick={inputOperator}>-</Button>
        </div>
        <div className="row">
          <Button onClick={evaluate}>=</Button>
        </div>
      </div>
    </div>
  );
}
