import React, { Component } from "react";
import styled from 'react-emotion';
// import { Header } from "../../components/Header/Header";
// import Header from "../../components/Header/Header";

const WelcomeWrapper = styled('div')({
    display: "flex",
    justifyContent: "center",
});


class Welcome extends Component {


    render() {
        return (
            <div>
                <WelcomeWrapper>
                    {/* <Header /> */}

                    {/* <Jumbotron />

                    <List /> */}
                        
                </WelcomeWrapper>
            </div>
        );
    }
}

export default Welcome;