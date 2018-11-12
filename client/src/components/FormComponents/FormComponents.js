//This file would hold all input, textarea, dropdown, and button components for any form
//##############################################################################

import React from "react";
import styled from 'react-emotion';

export const MainForm = styled('div')({
  width: 400,
  height: 550,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  padding: 20,
  boxShadow: '0 0 15px 5px rgba(0,0,0,0.5)',
  background: '#EDF0F3',
  flexFlow: 'row wrap'
})

export const FormTitle = styled('div')({
  fontSize: '1.6rem',
  lineHeight: '1.33333',
  color: 'rgba(0,0,0,1.9)',
  flex: '100%',
  background: '#F6F8FA',
  textAlign: 'center',
  padding: '16px 32px 8px 32px',
  display: 'flex',
  flexDirection: 'column',
  margin: '-20px -20px 0px -20px',
  borderBottom: '1px solid rgba(0,0,0,0.15)',
  height: 150
})

export const FormSubTitle = styled('h4')({
  fontSize: '1.2rem',
  lineHeight: '1.5',
  color: 'rgba(0,0,0,1.9)',
  flex: '100%',
  background: '#F6F8FA',
  textAlign: 'center',
  position: 'relative',
  padding: '0 8px 16px',
  borderBottom: '1px solid rgba(0,0,0,0.15)'
})

export const FormBody = styled('formbody')({
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center',
  width: 360,
})

const TextBoxInput = styled('input')({
  padding: '0px 5px 5px 0',
  float: 'left',
  margin: '0px 0 10px 0',
  width: 360,
  height: 32
})

const TextAreaInput = styled('input')({
  padding: '0px 5px 5px 0',
  float: 'left',
  margin: '0px 0 10px 0',
  width: 360,
  height: 150
})

const Label = styled('div')({
  fontSize: 14,
  textAlign: 'left'
})

export const SubmitButton = styled('button')({
  background: "rgb(0,115,177)",
  color: 'white',
  float: 'left',
  width: 360,
  height: 32
})

export const FormTextInput = ({ label, name, value, type, placeHolder, onChangeFn }) => {
  return (
    <div>
      <Label>{label}</Label>
      <TextBoxInput
        name={name}
        value={value}
        type={type}
        placeholder={placeHolder}
        onChange={onChangeFn}
      />
    </div>
  )
}

export const FormTextArea = ({ label, name, value, type, placeHolder, onChangeFn }) => {
  return (
    <div>
      <Label>{label}</Label>
      <TextAreaInput
        name={name}
        value={value}
        type={type}
        placeholder={placeHolder}
        onChange={onChangeFn}
      />
    </div>
  )
}
