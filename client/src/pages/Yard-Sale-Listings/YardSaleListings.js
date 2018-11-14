import React, { Component } from "react";
import styled from 'react-emotion';
import { YardSaleListCard } from "../../components/Yard-Sale-List/index";
import API from "../../utils/API";
import moment from "moment";
import { List, ListItem } from "../../components/List"

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
    justifyContent: "space-around",
    backgroundColor: "rgba(0, 0, 0, .4)"
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
                
                {/* <ListingsWrapper>
                    <IndividualListingsWrapper>
                        {this.state.yardSales.length ? (
                            this.state.yardSales.map(yardSale => {
                                return (
                                    <YardSaleListCard key={yardSale._id}
                                        link = {yardSale._id}
                                        address = {yardSale.address}
                                        zipCode = {yardSale.zipCode}
                                        date = {moment(yardSale.date).format('MM-DD-YY h:mm a')}
                                        name = {yardSale.name}
                                    />
                                );
                            })

                        ) : (
                        <h3>No Results to Display</h3>
                        )}
                    </IndividualListingsWrapper>
                </ListingsWrapper> */}

                {/* <ListingsWrapper> */}
                  <IndividualListingsWrapper>
                    {this.state.yardSales.length ? (
                      <List>
                        {this.state.yardSales.map(yardSale => (
                          <ListItem key={yardSale._id}>
                            <a href={"/yardsalelistings" + yardSale._id}>
                              <strong>
                                {yardSale.name}, {yardSale.address}, {yardSale.zipCode}, {moment(yardSale.date).format('MM-DD-YY h:mm a')}
                              </strong>
                            </a>
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                          <h3>No Results to Display</h3>
                        )}
                    </IndividualListingsWrapper>
                {/* </ListingsWrapper> */}

                </BodyWrapper>
            </div>
        );
    }
}

export default YardSaleListings;