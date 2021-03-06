import React, { Component } from "react";
import styled from 'react-emotion';
import API from "../../utils/API";
import moment from "moment";
import { List, ListItem } from "../../components/List"
import { DeleteButton, EditButton } from '../../components/FormComponents/FormComponents'

const BodyWrapper = styled('div')({
    width: '100%',
    minHeight: '100vh',
    alignItems: 'center',
    backgroundSize: 'cover'
  });
const YardSaleListingsWrapper = styled('div')({
    display: "flex",
    justifyContent: "center",
    backgroundColor: "white"
});

const IndividualListingsWrapper = styled('div')({
    flex: 1,
    flexWrap: "wrap",
    width: '60%',
    margin: 'auto'
});

const SearchButtons = styled('div')({
    margin: 10
})

const aTagStyle = {
  float: "left",
  color: 'black',
  marginTop: 5
}

class YardSaleListingsPage extends Component {

    state = {
        yardSales: [],
        searchZip: ""
    }

    searchByZip = (zip) => {
        API.getYardSaleByZip(zip)
            .then(res => this.setState({ yardSales: res.data }))
            .catch(err => console.log(err))
    }

    handleInput = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                
                <BodyWrapper>
                  <br></br>
                  <YardSaleListingsWrapper>
                    <SearchButtons>
                      <h3>Find Local Sales: </h3>   
                    </SearchButtons>
                    
                    <SearchButtons><input type="text" name="searchZip" value={this.state.searchZip} onChange={this.handleInput}></input>
                    </SearchButtons>
                    
                    <SearchButtons>
                    <button onClick={() => this.searchByZip(this.state.searchZip)}>Search By Zip Code
                    </button>
                  </SearchButtons>
                </YardSaleListingsWrapper>
                  <IndividualListingsWrapper>
                    {this.state.yardSales.length ? (
                      <List>
                        {this.state.yardSales.map(yardSale => (
                          <ListItem key={yardSale._id}>
                            <a style={aTagStyle} href={"/products/" + yardSale._id}>
                              <strong>
                                {yardSale.name} 
                              </strong>
                                , {yardSale.address}, {yardSale.zipCode}, {moment(yardSale.date).format('MM-DD-YY')} 
                            </a>

                            {/* <DeleteButton onClick={() => this.searchByZip(this.state.searchZip)}>Delete
                            </DeleteButton> */}

                            {/* <EditButton onClick={() => this.searchByZip(this.state.searchZip)}>Edit */}
                            {/* </EditButton> */}
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                          <h3>No Results to Display</h3>
                        )}
                    </IndividualListingsWrapper>              
                </BodyWrapper>
            </div>
        );
    }
}

export default YardSaleListingsPage;