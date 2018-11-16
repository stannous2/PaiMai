import React from "react";
import "./List.css";

const divStyle = {
  width: '60%',
  margin: 'auto'
}

export const List = ({ children }) => {
  return (
    <div className="list-overflow-container" style={divStyle}>
      <ul className="list-group">
        {children}
      </ul>
    </div>
  );
};
