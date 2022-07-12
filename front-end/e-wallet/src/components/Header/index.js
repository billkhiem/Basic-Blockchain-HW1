import React from "react";
import logo from "../../logo.svg";
import "./styles.css";
import {Nav, Navbar} from "react-bootstrap";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Home from "../Home";
import TxCreation from "../TxCreation";
import TxPending from "../TxPending";
import History from "../History";
import Settings from "../Settings";
import CreateWallet from "../Wallet";


function Header(){
    return (
        <Router>
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>
                        <img src={logo} width="40px" height="40px" alt="Logo"/>
                        BLOCKCHAIN DEMO
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link as={Link} to={"/home"}>Home</Nav.Link>
                        <Nav.Link as={Link} to={"/wallet"}>Wallet</Nav.Link>
                        <Nav.Link as={Link} to={"/transactions"}>Transaction</Nav.Link>
                        <Nav.Link as={Link} to={"/history"}>History</Nav.Link>
                        <Nav.Link as={Link} to={"/settings"}>Settings</Nav.Link>

                    </Nav>
                </Navbar>
            </div>
            <div>
                <Routes>
                    <Route path={"/home"} element={<Home/>}/>
                    <Route path={"/transactions"} element={<TxPending/>}/>
                    <Route path={"/history"} element={<History/>}/>
                    <Route path={"/settings"} element={<Settings/>}/>
                    <Route path={"/createTx"} element={<TxCreation/>}/>
                    <Route path={"/wallet"} element={<CreateWallet/>}/>
                </Routes>
            </div>
        </Router>
            
            
        
    );
}

export default Header;