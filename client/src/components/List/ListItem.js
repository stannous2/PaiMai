import React from "react";
import styled from 'react-emotion';
// import "./List.css";

const liStyle = {
  fontSize: 12,
  backgroundColor: 'whitesmoke',
  
}

export const ListItem = props => (
  <li className="list-group-item" style={liStyle}>
    {props.children}
  </li>
);
