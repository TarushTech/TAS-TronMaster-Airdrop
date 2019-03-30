import React, { Component } from 'react';
import Swal from "sweetalert2";
import { tokenAddress, saleAddress } from '../Config';

class SendToken extends Component {

    state = {
        tronWeb: {
            installed: false,
            loggedIn: false
        },
        tokenAddress: tokenAddress,
        tokenAmount: "",
        saleAddress: saleAddress
    };

    constructor(props) {
        super(props);
    }

    onTokenAmountChange = (e) => {
        this.setState({tokenAmount: e.target.value});
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

    onSend = async () => {
        if(this.state.tokenAmount == "") {
            alert("Please specify token amount");
            return;
        }

        const tokenContract = await window.tronWeb.contract().at(this.state.tokenAddress);
        let result = await tokenContract.transfer(this.state.saleAddress, this.state.tokenAmount * ( 10 ** 2)).send({
            feeLimit:100000000,
            callValue:0,
            shouldPollResponse:true
            });
        console.log("Result: ", result);
        if(result) {
            alert("Transfer was successful!");
        } else {
            alert("Transfer failed!");
        }

    }

    render() {
        return (
            <div style={styles.container}>
                <h1>Send tokens to the Sale contract</h1>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <label>Enter Token Amount</label>
                    <input type="text" value={this.state.tokenAmount} onChange={this.onTokenAmountChange} style={{ width: "200px", height: "20px", marginLeft: "20px" }} />
                </div>
                <div style={{margin: "20px"}}>
                    <button style={{width: "100px", height: "30px"}} onClick={this.onSend}>Send</button>
                </div>
            </div>
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

export default SendToken;