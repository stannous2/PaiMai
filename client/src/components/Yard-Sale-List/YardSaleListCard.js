import React from "react";
import styled from "react-emotion";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./style.css"
import collage from '../../images/collage.jpg'


const BodyWrapper = styled('div')({
    width: "100%",
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundColor: "rgba(0, 0, 0, .1)"
    // opacity: '0.7'   
  });

  const Wrapper = styled('div')({
    // display: "inline-table",
    margin: '5px',
    boxShadow: "1px 2px 2px 0px grey",
    paddingTop: '5px',
    color: "black",
    background: 'slategray',
    borderRadius: '2px',
    height: '170px',
    width: '190px',
    boxShadow: '0 3px 6px #999, 0 3px 6px #999'
})

const linkStyle = {
  float: 'left',
}

export const YardSaleListCard = ({ address, zipCode, date, name, link }) => {
  return (
      <Wrapper>
          <Link className="link" to={"/products/" + link}>
          <h5>{name}</h5>
          <p>Address: {address}</p>
          <p>Zip: {zipCode}</p>
          <p>Date: {date}</p>
          </Link>
      </Wrapper>
  )
}

// export const YardSaleListCard = ({ address, zipCode, date, name, link }) => {
//     return (
//         <BodyWrapper>
//         <Wrapper>
//             <Link className="link" to={"/products/" + link}>
//             <h4><p>{name}</p></h4>
//             <p>Address: {address} {zipCode}</p>
//             <p>Date Posted: {date}</p>
//             </Link>
//         </Wrapper>
//         </BodyWrapper>
//     )
// }