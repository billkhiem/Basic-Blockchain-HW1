import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function History(){

    const [chain,setChains]=useState([]);
    let count=0;
    const [difficulty,setDifficulty]=useState(0);
    useEffect(()=>{
        fetch("http://localhost:5000/history")
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            setChains(data.chain);
            setDifficulty(data.difficulty);
            console.log(data.chain);
        })
        .catch(err=>{
            console.log(`Error: ${err}`);
        });
    },[]);

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <main role="main" className="col-lg-12 d-flex text-center">
                    <div className="content mr-auto ml-auto" style={{ width: "100%" }}>
                        <h5>Blockchain History</h5>
                        <div className="row">
                            <div className="col-4">
                                <div className="bg-light pt-4 pb-3 m-1">
                                    <h5>Latest Block</h5>
                                    <p>{chain.length}</p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="bg-light pt-4 pb-3 m-1">
                                    <h5>Difficulty</h5>
                                    <p>{difficulty}</p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="bg-light pt-4 pb-3 m-1">
                                    <h5>Hash Rate</h5>
                                    <p>-</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 mt-3">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Latest Blocks</h5>
                                    </div>
                                    <div className="card-body">
                                        <Table>
                                            <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Hash</th>
                                                <th scope="col">Miner</th>
                                                <th scope="col">Timestamp</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {chain.map((element,index)=>{
                                                    return (
                                                        <tr key={element.id}>
                                                            <td>{index}</td>
                                                            <td>{element.hash}</td>
                                                            <td>anonymous-miner</td>
                                                            <td>{element.timestamp}</td>
                                                        </tr> 
                                                    );
                                                })}
                                                                       
                                          </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>

                        </div>
                        
                        <div className="row">
                            <div className="col-lg-12 mt-3">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Latest Transactions</h5>
                                    </div>
                                    <div className="card-body">
                                        <Table>
                                            <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">From</th>
                                                <th scope="col">To</th>
                                                <th scope="col">Amount</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {chain.filter(element=>{
                                                    if (element.transactions.length>0)
                                                        return true;
                                                    else
                                                        return false;
                                                }).map((element,index)=>{ 
                                                    console.log(element);                                                    
                                                    const trans=[];
                                                    let from="";
                                                    let to="";
                                                    for (let i=0;i<element.transactions.length;i++){
                                                        //console.log(element.transactions[i].fromAddress);
                                                        if (element.transactions[i].fromAddress){
                                                            if (element.transactions[i].fromAddress.length>20)
                                                                from=element.transactions[i].fromAddress.substring(0,20)+"...";
                                                            else
                                                                from=element.transactions[i].fromAddress;
                                                        } else from="N/A (Reward)";
                                                        if (element.transactions[i].toAddress){
                                                            if (element.transactions[i].toAddress.length>20)
                                                                to=element.transactions[i].toAddress.substring(0,20)+"...";
                                                            else
                                                                to=element.transactions[i].toAddress;
                                                        } else to="N/A";
                                                        const simplifiedToAdd=element.transactions[i].toAddress ? element.transactions[i].toAddress.substring(0,30)+"..." : "";
                                                        trans.push((
                                                            <tr key={element.transactions[i].id}>
                                                                <td>{count}</td>
                                                                <td>{from}</td>
                                                                <td>{to}</td>
                                                                <td>{element.transactions[i].amount}</td>
                                                            </tr>
                                                        ));
                                                        count++;
                                                    }
                                                        
                                                    return trans;
                                                    })
                                                    
                                                }
                                                
                                           </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default History;