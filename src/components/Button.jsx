import React from "react";
import "./components.css";

const Button = ({ children, onClick, isInput }) => {
  const isNum = (val) => {
    if (!isNaN(val) || val === "C" || val === ".") {
      return true;
    }
    return false;
  };

  const isEqual = (val) => {
    if (val === "=") {
      return true;
    }
    return false;
  };

  return (
    <>
      {isInput ? (
        <div className="input">{children}</div>
      ) : (
        <div
          className={`button-wrapper button ${
            isEqual(children) ? "equal-btn" : null
          } ${isNum(children) ? null : "operator"}`}
          onClick={() => onClick(children)}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Button;
