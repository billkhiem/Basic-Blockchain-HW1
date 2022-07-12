import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "./styles.css";

import {useNavigate} from 'react-router-dom';

function TxPending(){

    const navigate=useNavigate();
    const [pendingTxs,setPendingTxs]=useState([]);
    const [isMined,setIsMined]=useState(false);

    useEffect(()=>{
        fetch("http://localhost:5000/pendingTx")
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            console.log(data);
            setPendingTxs(data.pendingTransactions);
        });
    },[isMined]);

    function startMining(){
        fetch("http://localhost:5000/mine")
        .then(res=>{
            alert("Success Mined");
            //console.log(`Success ${res}`);
            setIsMined(!isMined);
        }).catch(err=>{
            console.log(`Error ${err}`)
        });
    }
    return (
        <div className="tx-page">
            <div className="create-btn">
                <Button variant="primary" onClick={()=>navigate("/createTx")}>Create Transaction</Button>
            </div>
            
            <Table>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Valid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingTxs.map((element,index)=>{
                            console.log(element);
                            const simplifiedFromAdd=element.fromAddress.substring(0,20);
                            const simplifiedToAdd=element.toAddress.substring(0,20);
                            return (
                                <tr key={"Ptx"+index}>
                                    <td>{index}</td>
                                    <td>{simplifiedFromAdd}...</td>
                                    <td>{simplifiedToAdd}</td>
                                    <td>{element.amount}</td>
                                    <td>{element.validity.toString()}</td>
                                </tr>
                            );
                        })}
                        
                    </tbody>
            </Table>
        
            <Button variant="primary" disabled={pendingTxs.length ===0? true : false} onClick={startMining}>Start mining</Button>
        </div>
    );
}

export default TxPending;