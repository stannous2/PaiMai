import React, { Component } from "react";
import styled from 'react-emotion';


const EditProductCard = ({ 
    handleInput, 
    editProductName, 
    editImageUrl, 
    editPrice, 
    editQuantity,
    editCategory,
    editDescription,
    }) => {
    return (
        <div>
            <div>Product Name: <input type="text" name="editProductName" value={editProductName} onChange={ handleInput}></input></div><br></br>

            <div>Image URL: <input type="text" name="editImageUrl" value={editImageUrl} onChange={handleInput}></input></div><br></br>

            <div>Price: <input type="text" name="editPrice" value={editPrice} onChange={handleInput}></input></div><br></br>

            <div>Quantity: <input type="text" name="editQuantity" value={editQuantity} onChange={handleInput}></input></div><br></br>

            <div>Category: <input type="text" name="editCategory" value={editCategory} onChange={handleInput}></input></div><br></br> 

            <div>Description: <textarea name="editDescription" value={editDescription} onChange={handleInput}></textarea></div>
        </div>
    )
}

export default EditProductCard;