import React, { Component } from 'react';
import Swal from "sweetalert2";
import { tokenAddress, saleAddress } from '../Config';

class Balances extends Component {

    state = {
        tronWeb: {
            installed: false,
            loggedIn: false
        },
        tokenAddress: tokenAddress,
        saleAddress: saleAddress,
        TRXAmount: "",
        TASAmount: "",
        defaultAddress: "",
        participated: false
    };

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        setTimeout(async () => {
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

            const currentAddress = window.tronWeb.defaultAddress.base58;
            const trxBalance = await window.tronWeb.trx.getBalance(currentAddress);
            
            const saleContract = await window.tronWeb.contract().at(this.state.saleAddress);
            let participated = await saleContract.participated(currentAddress).call({
                feeLimit: 100000000,
                callValue: 0,
                shouldPollResponse: true
            });

            const tokenContract = await window.tronWeb.contract().at(this.state.tokenAddress);
            let result = await tokenContract.balanceOf(currentAddress).call({
                feeLimit: 100000000,
                callValue: 0,
                shouldPollResponse: true
            });

            
            this.setState({ defaultAddress: currentAddress, TRXAmount: trxBalance / (10 ** 6), TASAmount: window.tronWeb.toDecimal(result.balance._hex) / (10 ** 2), participated })
        }, 1000);



    }




    render() {
        return (
            <div style={styles.container}>
                <h1>Balances</h1>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <div style={{ width: "50%", textAlign: "right", paddingRight: "40px" }}>
                        <label>Address: </label>
                    </div>
                    <div style={{ width: "50%", textAlign: "left", paddingLeft: "40px" }}>
                        <h style={{ width: "200px", height: "20px" }} > {this.state.defaultAddress} </h>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <div style={{ width: "50%", textAlign: "right", paddingRight: "40px" }}>
                        <label>TRX Amount: </label>
                    </div>
                    <div style={{ width: "50%", textAlign: "left", paddingLeft: "40px" }}>
                        <h style={{ width: "200px", height: "20px" }} > {this.state.TRXAmount} </h>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <div style={{ width: "50%", textAlign: "right", paddingRight: "40px" }}>
                        <label>TAS Amount: </label>
                    </div>
                    <div style={{ width: "50%", textAlign: "left", paddingLeft: "40px" }}>
                        <h style={{ width: "200px", height: "20px" }} > {this.state.TASAmount} </h>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <div style={{ width: "50%", textAlign: "right", paddingRight: "40px" }}>
                        <label>Received: </label>
                    </div>
                    <div style={{ width: "50%", textAlign: "left", paddingLeft: "40px" }}>
                        <h style={{ width: "200px", height: "20px" }} > {this.state.participated ? "true" : "false"} </h>
                    </div>
                </div>

            </div >
        )
    }
}


const styles = {
    container: {
        border: "1px solid black",
        height: "200px",
        width: "80%",
        marginTop: "50px",
        backgroundColor: "#ffffff",
        borderRadius: "10px",

    }
}

export default Balances;