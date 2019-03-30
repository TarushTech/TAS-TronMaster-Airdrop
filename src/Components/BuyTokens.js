import React, { Component } from 'react';
import Swal from "sweetalert2";
import { tokenAddress, saleAddress } from '../Config';

class BuyTokens extends Component {

    state = {
        tronWeb: {
            installed: false,
            loggedIn: false
        },
        tokenAddress: tokenAddress,
        saleAddress: saleAddress
    };

    constructor(props) {
        super(props);
    }

    onTRXAmountChange = (e) => {
        this.setState({ TRXAmount: e.target.value });
    }

    componentDidMount() {
        setTimeout(() => {
            const tronWebState = {
                installed: !!window.tronWeb,
                loggedIn: window.tronWeb && window.tronWeb.ready
            };

            if (!tronWebState.installed) {
                Swal.fire(
                    "Oops...",
                    "You do not have Tronlink chrome extension installed!",
                    "error"
                );
                return;
            }

            if (!tronWebState.loggedIn) {
                Swal.fire(
                    "Oops...",
                    "Please log in to the Tronlink extension",
                    "error"
                );
                return;
            }

            this.setState({
                tronWeb: tronWebState
            });
        }, 1000);


    }

    getFreeTAS = async () => {

        try {
            const tokenContract = await window.tronWeb.contract().at(this.state.saleAddress);
            let result = await tokenContract.sale().send({
                feeLimit: 100000000,
                callValue: 0 * (10 ** 6),
                shouldPollResponse: true
            });
            alert("Transaction was successful")
        } catch (err) {
            console.log(err);
            alert("Transaction failed!");
        }


    }

    getOneBillionTAS = async () => {

        try {
            const tokenContract = await window.tronWeb.contract().at(this.state.saleAddress);
            let result = await tokenContract.sale().send({
                feeLimit: 100000000,
                callValue: 2000000 * (10 ** 6),
                shouldPollResponse: true
            });
            alert("Transaction was successful")
        } catch (err) {
            console.log(err);
            alert("Transaction failed!");
        }


    }

    render() {
        return (
            <div style={styles.container}>
                <h1>Buy Tokens from Sale contract</h1>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <label>Get 100,000 TAS for free</label>
                </div>
                <div style={{ margin: "20px" }}>
                    <button style={{ width: "100px", height: "30px" }} onClick={this.getFreeTAS}>GET</button>
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <label>Get 1 billion TAS for 2 million TRX</label>
                </div>
                <div style={{ margin: "20px" }}>
                    <button style={{ width: "100px", height: "30px" }} onClick={this.getOneBillionTAS}>GET</button>
                </div>
            </div>
        )
    }
}


const styles = {
    container: {
        border: "1px solid black",
        height: "300px",
        width: "80%",
        marginTop: "50px",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
}

export default BuyTokens;