import React from "react";
import styled from 'react-emotion';
// import "./List.css";

const li = styled('div')({
  fontSize: 12,
  textAlign: 'left',
  background: ''
})

export const ListItem = props => (
  <li className="list-group-item" background-color='whitesmoke'>
    {props.children}
  </li>
);
