import React from "react";
import styled from 'react-emotion';
import "./LoginForm.css";

const LoginInput = styled('input')({
  width: 200,
  height: 30,
  marginRight: 5
})

const LoginFormItem = ({ name, value, type, placeHolder, onChangeFn }) => {
  return (
    <div>
      <LoginInput
        name={name}
        value={value}
        type={type}
        placeholder={placeHolder}
        onChange={onChangeFn}
      />
    </div>
  )
}
export default LoginFormItem;
