import React from "react";
import Container from "../Grid/Container"
import styled from "react-emotion"

const Wrapper = styled('div')({
  margin: 25
})

const ProductCard = ({ imageUrl, price, category, productName, quantity, description, interest, clickHandle, id }) => (
  
  <Container>
  <Wrapper>  
    <div>

      <img src={imageUrl} alt={productName} style={{ height: 150, width: 150, textAlign: "center" }}></img>
      <p>Product: {productName}</p>
      <p>Price: {price}</p>
      <p>Quantity: {quantity}</p>
      <p>Category: {category}</p>
      <p>Description: {description}</p>
      <p>Interest: {interest}</p>
            <button onClick={() => clickHandle(id)} >Add Interest! <i className="fa fa-thumbs-up"></i></button>
    </div>
  </Wrapper>
  </Container>
);

export default ProductCard;
