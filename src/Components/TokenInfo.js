import React, { Component } from 'react';
import Swal from "sweetalert2";
import { tokenAddress, saleAddress } from '../Config';

class TokenInfo extends Component {

    state = {
        tronWeb: {
            installed: false,
            loggedIn: false
        },
        tokenAddress: tokenAddress,
        TRXAmount: "",
        TASAmount: "",
        saleAddress: saleAddress,
        noOfUsers: "",
        paidParticipants: ""

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


            const trxBalance = await window.tronWeb.trx.getBalance(this.state.saleAddress);


            const tokenContract = await window.tronWeb.contract().at(this.state.tokenAddress);
            let result = await tokenContract.balanceOf(this.state.saleAddress).call({
                feeLimit: 100000000,
                callValue: 0,
                shouldPollResponse: true
            });


            const saleContract = await window.tronWeb.contract().at(this.state.saleAddress);
            let total_participants = await saleContract.participants().call({
                feeLimit: 100000000,
                callValue: 0,
                shouldPollResponse: true
            });

            total_participants = window.tronWeb.toDecimal(total_participants._hex);

            let paid_participants = await saleContract.paidParticipants().call({
                feeLimit: 100000000,
                callValue: 0,
                shouldPollResponse: true
            });

            paid_participants = window.tronWeb.toDecimal(paid_participants._hex);

            this.setState({ TRXAmount: trxBalance / (10 ** 6), TASAmount: window.tronWeb.toDecimal(result.balance._hex) / (10 ** 2), noOfUsers: total_participants, paidParticipants: paid_participants })


        }, 1000);



    }




    render() {
        return (
            <div style={styles.container}>
                <h1>Token Info</h1>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "50%", textAlign: "right", paddingRight: "40px" }}>
                        <label>Sale Address: </label>
                    </div>
                    <div style={{ width: "50%", textAlign: "left", paddingLeft: "40px" }}>
                        <h style={{ width: "200px", height: "20px", marginLeft: "20px" }} > {this.state.saleAddress} </h>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "50%", textAlign: "right", paddingRight: "40px" }}>
                        <label>TRX Amount: </label>
                    </div>
                    <div style={{ width: "50%", textAlign: "left", paddingLeft: "40px" }}>
                        <h style={{ width: "200px", height: "20px", marginLeft: "20px" }} > {this.state.TRXAmount} </h>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "50%", textAlign: "right", paddingRight: "40px" }}>
                        <label>TAS Amount: </label>
                    </div>
                    <div style={{ width: "50%", textAlign: "left", paddingLeft: "40px" }}>
                        <h style={{ width: "200px", height: "20px", marginLeft: "20px" }} > {this.state.TASAmount} </h>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "50%", textAlign: "right", paddingRight: "40px" }}>
                        <label>Number of users who have participated: </label>
                    </div>
                    <div style={{ width: "50%", textAlign: "left", paddingLeft: "40px" }}>
                        <h style={{ width: "200px", height: "20px", marginLeft: "20px" }} > {this.state.noOfUsers} </h>
                    </div>
                </div>


                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "50%", textAlign: "right", paddingRight: "40px" }}>
                        <label>Paid participants: </label>
                    </div>
                    <div style={{ width: "50%", textAlign: "left", paddingLeft: "40px" }}>
                        <h style={{ width: "200px", height: "20px", marginLeft: "20px" }} > {this.state.paidParticipants} </h>
                    </div>
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

export default TokenInfo;