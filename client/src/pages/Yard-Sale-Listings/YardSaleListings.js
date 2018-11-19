import React, { Component } from "react";
import styled from 'react-emotion';
import { YardSaleListCard } from "../../components/Yard-Sale-List/index";
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

const ListingsWrapper = styled('div')({
    display: "flex",
    flexWrap: 'wrap',
    justifyContent: "initial",
    backgroundColor: "white",
    width: '70%',
    margin: 'auto'
});

const SearchButtons = styled('div')({
    margin: 10
})

const h3Style = {
  color: 'black',
  margin: 'auto'
}

class YardSaleListings extends Component {

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

                  <ListingsWrapper>
                          {this.state.yardSales.length ? (
                              this.state.yardSales.map(yardSale => {
                                  return (
                                      <YardSaleListCard key={yardSale._id}
                                          link = {yardSale._id}
                                          address = {yardSale.address}
                                          zipCode = {yardSale.zipCode}
                                          date = {moment(yardSale.date).format('MM-DD-YY')}
                                          name = {yardSale.name}
                                      />
                                  );
                              })

                          ) : (
                          <div style={h3Style}>
                            <h3>No Results to Display</h3>
                          </div>
                          )}
                  </ListingsWrapper>
                </BodyWrapper>
            </div>
        );
    }
}

export default YardSaleListings;