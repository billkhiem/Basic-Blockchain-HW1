import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

import "./styles.css";
function Home(){

    const [blocks,setBlocks]=useState([]);
    const [selectedBlock,setSelectedBlock]=useState(0);
    const [listTxs,setListTxs]=useState([]);
    useEffect(()=>{
        fetch("http://localhost:5000/home")
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            console.log(data.blocks[selectedBlock].transactions)
            setBlocks(data.blocks);  
            setListTxs(data.blocks[selectedBlock].transactions);          
        })
        .catch(function(err){
            console.log(err);
        });

        
    },[]);

    function showDetail(index){
        setSelectedBlock(index);
        console.log(blocks[index].transactions);
        setListTxs(blocks[index].transactions);
    }

    return (
        <div className="row">

            {blocks.map((element,index)=>{
                //console.log(element);
                return (
                        <div className="card m-3 card-size" id={element.id} onClick={()=>showDetail(index)} style={{borderColor: selectedBlock==index? "blue": "black"}}>
                            <div className="card-body">
                                <h5 className="card-title">BLOCK {index}</h5>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <span>Hash</span><br/>
                                    <div className="text-truncate">
                                        <small>{element.hash}</small>
                                    </div>
                                    <span>Hash of previous block</span><br/>
                                    <div className="text-truncate">
                                        <small>{element.previousHash}</small>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <span>Nounce</span><br/>
                                    <div className="text-truncate text-muted">
                                        <small>{element.nounce}</small>
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <span>Timestamp</span><br/>
                                    <div className="text-truncate text-muted">
                                        <small>{element.timestamp}</small>
                                    </div>
                                </li>
                        </ul>
                    </div>  
                );

            })}
            <div className="row">
                <div className="col-lg-12 mt-3">
                    <div className="card">
                        <div className="card-header text-center">
                            <h5>Transaction Detail of Block {selectedBlock}</h5>
                        </div>
                        <div className="card-body">
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
                                    {listTxs.length>0 && listTxs.map((element,index)=>{
                                        let from="";
                                        let to="";
                                        if (element.fromAddress){
                                            if (element.fromAddress.length>20)
                                                from=element.fromAddress.substring(0,20)+"...";
                                            else
                                                from=element.fromAddress;
                                        } else
                                            from="N/A (Reward)";
                                        if (element.toAddress){
                                            if (element.toAddress.length>20)
                                                to=element.toAddress.substring(0,20)+"...";
                                            else
                                                to=element.toAddress;
                                        } else
                                            to="N/A";
                                        return (
                                            <tr key={element.id}>
                                                <td>{index}</td>
                                                <td>{from}</td>
                                                <td>{to}</td>
                                                <td>{element.amount}</td>
                                                <td>{element.validity.toString()}</td>
                                            </tr> 
                                        );
                                    })}
                                                            
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>

            </div>
            
            

        </div>
        
    );
}

export default Home;

/*


*/