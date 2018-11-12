import React, { Component } from "react";
import styled from 'react-emotion';
import API from "../../utils/API";
import DeleteBtn from "../../components/DeleteBtn";
import Row from "../../components/Grid/Row";
import Col from "../../components/Grid/Col";
import Container from "../../components/Grid/Container";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import Jumbotron from "../../components/Jumbotron";
import ProductEdit from "../../components/Edit-Product/ProductEdit"
import collage from '../../images/collage.jpg'

const BodyWrapper = styled('div')({
    width: '100%',
    minHeight: '100vh',
    alignItems: 'center',
    display: 'flex',
    backgroundSize: 'cover',
    background: `url("${collage}")`,
    backgroundRepeat: "y"
  });
const StyledButton = styled('button')({
    background: "#283e4a",
    color: 'white',
    height: 30
})

const YardSaleCreationWrapper = styled('div')({
    margin: 20,
    padding: 20,
    alignContent: 'center',
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.5)",
})


const ProductHolder = styled('div')({
    display: "inline-block"
})
const YardSaleCreationProductsWrapper = styled('div')({
    margin: 20,
    flexDirection: "column",
    alignItems: "center",
})
const YardSaleCreationElement = styled('div')({
    margin: 15,
    alignItems: "center"
})
const YardSaleCreationItemElements = styled('div')({
    margin: 15,
    display: "flex",
    alignItems: "baseline",

})
const ProductsInput = styled('input')({
    marginLeft: 20,
    float: "right"
})

const resultsDisplay = {
    color: 'white',
  }

class YardSaleCreation extends Component {
    state = {
        displayProducts: false,
        address: "Street, City, State",
        zipCode: 12345,
        name: "Yard Sale Name",
        date: "2018-12-3101:00",
        userID: "",
        yardSaleID: "",
        _id: "",
        imageUrl: "",
        productName: "",
        price: "",
        quantity: "",
        category: "",
        description: "",
        intCounter: 0,
        userYardSales: [],
        products: [],
        editImageUrl: "",
        editProductName: "",
        editPrice: "",
        editQuantity: "",
        editCategory: "",
        editDescription: "",
        editID: "",
        editProductIDs: [],
        showEdit: false,
        filteredProducts: [],
        isFinalized: false
    }

    componentDidMount() {
        API.getUser(this.props.id)
            .then(res => this.setState({ userYardSales: this.state.userYardSales.concat(res.data.yardSales) }))
    }

    handleInput = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    submitYardSale = () => {
        this.setState({ userID: this.props.id })
        this.setState({ displayProducts: true })
        let newSale = {
            name: this.state.name,
            address: this.state.address,
            zipCode: this.state.zipCode,
            date: new Date(this.state.date + ":00Z")
        }
        API.createYardSale(this.props.id, newSale)
            //Gets the newest yard sale that the user creates after submitting the info so they can
            //add products to it
            .then(res => this.setState({ yardSaleID: res.data.yardSales[res.data.yardSales.length - 1] }))
            .catch(err => console.log(err))
    }

    submitItem = () => {
        let newItem = {
            productName: this.state.productName,
            imageUrl: this.state.imageUrl,
            category: this.state.category,
            quantity: this.state.quantity,
            price: this.state.price,
            description: this.state.description,
            interest: this.state.intCounter
        }
        API.createNewProduct(newItem)
            //Pushes each new item _id that is created to an array so that can be saved to update the new sale
            //with new product listings
            .then(res => this.setState({ products: this.state.products.concat(res.data)}))
            .catch(err => console.log(err))
    }

    finalizeYardSale = () => {
        let productIds;
        if(this.state.filteredProducts.length > 0){
            console.log("filtered products being sent");
         productIds = this.state.filteredProducts.map(({ _id }) => _id);
        }else{
            console.log("normal products being sent");
             productIds = this.state.products.map(({ _id }) => _id);
        }
        
        console.log(productIds);
        API.updateYardSale(this.state.yardSaleID, { listings: productIds })
            .then(this.setState({ isFinalized: true }))
            .catch(err => console.log(err))

    }

    editYardSale = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        let editSale = {
            name: this.state.name,
            address: this.state.address,
            zipCode: this.state.zipCode,
            date: new Date(this.state.date + ":00Z")
        }
        API.updateYardSaleEdit(this.state.yardSaleID, editSale)
            .then(alert("You have successfully edited your info."))
            .catch(err => console.log(err))
    }

    beginEdit = (id) => {
        API.getProduct(id)
            .then(res => this.setState({ 
                editProductName: res.data.productName,
                editImageUrl: res.data.imageUrl,
                editCategory: res.data.category,
                editQuantity: res.data.quantity,
                editPrice: res.data.price,
                editDescription: res.data.description,
                editID: res.data._id,
                showEdit: true
            }))
            .catch(err => console.log(err))
    }

    renderEdit = (id) => {
        if(this.state.showEdit === true && this.state.editID === id){
            return (
                <div>
                    <ProductEdit 
                        key = {this.state.editID}
                        id = {this.state.editID}
                        handleInput = {this.handleInput}
                        editProductName = {this.state.editProductName}
                        editImageUrl = {this.state.editImageUrl}
                        editPrice = {this.state.editPrice}
                        editQuantity = {this.state.editQuantity}
                        editCategory = {this.state.editCategory}
                        editDescription = {this.state.editDescription}
                    />
                    <StyledButton onClick={this.deleteProduct}>Delete</StyledButton>
                    <StyledButton onClick={this.editProduct}>Save</StyledButton>
                </div>
            )
        }
    }

    deleteProduct = () => {
        let id = this.state.editID;
        API.deletProducts(id)
            .then(alert("Successfully marked product for deletion."))
            .catch(err => console.log(err));
        const filteredProducts = this.state.products.filter(product => (product._id !== id));
        this.setState({ filteredProducts: filteredProducts });
    }

    editProduct = () => {
        let id = this.state.editID;
        let editItem = {
            productName: this.state.editProductName,
            imageUrl: this.state.editImageUrl,
            category: this.state.editCategory,
            quantity: this.state.editQuantity,
            price: this.state.editPrice,
            description: this.state.editDescription,
            interest: this.state.interest
        }
        API.updateListing(id, editItem)
            .then(this.setState({
                productName: this.state.editProductName,
                imageUrl: this.state.editImageUrl,
                category: this.state.editCategory,
                quantity: this.state.editQuantity,
                price: this.state.editPrice,
                description: this.state.editDescription,
                interest: this.state.interest
            }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                {! this.state.isFinalized ?
            <BodyWrapper>
                {this.props.id ? (
                    <YardSaleCreationWrapper>
                        <h3>Enter Your Sale's Info</h3>
                        {/* Name of Sale */}
                        <YardSaleCreationElement>Name: <input type="text" name="name" value={this.state.name} onChange={this.handleInput}></input></YardSaleCreationElement>
                        {/* Address */}
                        <YardSaleCreationElement>Address: <input type="text" name="address" value={this.state.address} onChange={this.handleInput}></input></YardSaleCreationElement>
                        {/* Zip Code */}
                        <YardSaleCreationElement>Zip Code: <input type="text" name="zipCode" value={this.state.zipCode} onChange={this.handleInput}></input></YardSaleCreationElement>
                        {/* Date of Sale */}
                        <YardSaleCreationElement>Sale Date: <input type="datetime-local" name="date" value={this.state.date} onChange={this.handleInput}></input></YardSaleCreationElement>
                        <YardSaleCreationElement>
                            <StyledButton onClick={this.submitYardSale}>Submit</StyledButton>
                        </YardSaleCreationElement>
                        <YardSaleCreationElement>
                            <StyledButton onClick={this.editYardSale}>Edit Yard Sale</StyledButton>
                        </YardSaleCreationElement>
                    </YardSaleCreationWrapper>
                ) :
                    (<div><h1 style={resultsDisplay}>Must Be Logged In to Create A Yard Sale</h1></div>
                    )}
                {this.state.displayProducts ? (
                    <Container fluid>
                    <YardSaleCreationWrapper>
                        <Row>
                            <Col size="sm-12">
                                <h1>Add an Item to Sell</h1>
                                <ProductHolder>
                                    <YardSaleCreationProductsWrapper>
                                        <YardSaleCreationItemElements>Product Name: <ProductsInput type="text" name="productName" value={this.state.productName} onChange={this.handleInput}></ProductsInput></YardSaleCreationItemElements>

                                        <YardSaleCreationItemElements>Image URL: <ProductsInput type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.handleInput}></ProductsInput></YardSaleCreationItemElements>

                                        <YardSaleCreationItemElements>Price: <ProductsInput type="text" name="price" value={this.state.price} onChange={this.handleInput}></ProductsInput></YardSaleCreationItemElements>

                                        <YardSaleCreationItemElements>Quantity: <ProductsInput type="text" name="quantity" value={this.state.quantity} onChange={this.handleInput}></ProductsInput></YardSaleCreationItemElements>

                                        <YardSaleCreationItemElements>Category: <ProductsInput type="text" name="category" value={this.state.category} onChange={this.handleInput}></ProductsInput></YardSaleCreationItemElements>

                                        <YardSaleCreationItemElements>Description: <textarea name="description" value={this.state.description} onChange={this.handleInput}></textarea></YardSaleCreationItemElements>

                                        <YardSaleCreationItemElements><FormBtn onClick={this.submitItem}>Submit Item</FormBtn></YardSaleCreationItemElements>
                                    </YardSaleCreationProductsWrapper>
                                </ProductHolder>
                            </Col>
                        </Row>
                    </YardSaleCreationWrapper>
                    </Container>
                ) : (
                        <div></div>
                    )}
                <Container fluid>
                    <Row>
                        <Col size="sm-12">
                            <YardSaleCreationWrapper>
                                <h1>Items for Sale</h1>
                            
                            {this.state.products.length > 0 ? (
                                <List>
                                    {this.state.products.map(product => (
                                        <ListItem key={product._id}>
                                            <strong>
                                                Product: {product.productName}
                                            </strong>
                                            <YardSaleCreationElement><StyledButton onClick={() => this.beginEdit(product._id)}>Edit</StyledButton></YardSaleCreationElement>
                                                <ProductHolder>
                                                    <YardSaleCreationProductsWrapper>
                                                        {this.renderEdit(product._id)}
                                                    </YardSaleCreationProductsWrapper>
                                                </ProductHolder>
                                        </ListItem>
                                    ))}
                                    <YardSaleCreationElement>
                                        <StyledButton onClick={this.finalizeYardSale}>Finalize Yard Sale</StyledButton>
                                    </YardSaleCreationElement>
                                </List>
                            ) : (
                                    <h3>No Results to Display</h3>
                                )}

                        </YardSaleCreationWrapper>
                        </Col>
                    </Row>
                </Container>

            </BodyWrapper>
            : <div>
                <h1>You Created Your Sale!</h1>
            </div>}
            </div>
        );
    }
}

export default YardSaleCreation;