import React from "react";
import styled from "react-emotion";

const Wrapper = styled('div')({
    margin: 10,
    boxShadow: "1px 2px 2px 0px grey",
    padding: 10
})

const ATag = styled('a')({
    color: "blue"
})

const YardSaleCreationSales = ({ name, link }) => {
    return (
        <Wrapper>
            <ATag href={"/products/" + link}>Click Here to View Products</ATag>
            <p>{name}</p>
        </Wrapper>
    )
}

export default YardSaleCreationSales;