import React, { Component } from "react";
import Swal from "sweetalert2";
import TronWeb from 'tronweb';

import logo from "./logo.svg";
import "./App.css";
import SendToken from "./Components/SendTokens";
import BuyTokens from "./Components/BuyTokens";
import Balances from './Components/Balances';
import TokenInfo from './Components/TokenInfo';

class App extends Component {

  render() {
    return (
      <div className="App" style={styles.container}>
          <div className="container container-fullwidth">
              <div
                  className="header-main logo-position-left header-colors-light header-layout-fullwidth header-style-3">
                  <div className="site-title">
                      <div className="site-logo" style={{width:176}}>
                          <a href="http://tarush.tech/" rel="home">
                            <span className="logo" style={{minWidth: 177}}>
                            <img data-tgpli-src="http://45.77.179.175/wp-content/themes/gem/assets/img/Tarush-3rd-Long-V3-Blur0.png"
                                 data-tgpli-srcset="http://45.77.179.175/wp-content/themes/gem/assets/img/Tarush-3rd-Long-V3-Blur0.png 1x,
                                http://45.77.179.175/wp-content/themes/gem/assets/img/Tarush-3rd-Long-V3-Blur0.png 2x,
                                http://45.77.179.175/wp-content/themes/gem/assets/img/Tarush-3rd-Long-V3-Blur0.png 3x" alt="Gem CryptoCoin"
                                 style={{width:177}} className="default" data-tgpli-inited="" id="tgpli-5c484e9fda320" srcSet="http://45.77.179.175/wp-content/themes/gem/assets/img/Tarush-3rd-Long-V3-Blur0.png 1x,
                                http://45.77.179.175/wp-content/themes/gem/assets/img/Tarush-3rd-Long-V3-Blur0.png 2x,
                                http://45.77.179.175/wp-content/themes/gem/assets/img/Tarush-3rd-Long-V3-Blur0.png 3x"
                                 src="http://45.77.179.175/wp-content/themes/gem/assets/img/Tarush-3rd-Long-V3-Blur0.png"/>
                            </span>
                          </a>
                      </div>
                  </div>
              </div>
          </div>
          <h2 style={{color:'#fff'}}>Tarush Airdrop</h2>
          <Balances />   
          {/*<SendToken />*/}
          <BuyTokens />
          <TokenInfo />
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#24262e",
    paddingBottom: "100px",
    paddingTop: "100px"
  }
}

export default App;
