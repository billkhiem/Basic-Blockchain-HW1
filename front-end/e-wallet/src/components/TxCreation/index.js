import React, { useEffect, useState } from "react";
import {Form, Button, InputGroup, FormControl} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function TxCreation(){

    const [fromAddress,setFromAddress]=useState("");
    const [signatureKey,setSecurityKey]=useState("");
    const [toAddress,setToAddress]=useState("");
    const [amount,setAmount]=useState(0);

    const [type,setType]=useState("password");
    const [textButton,setTextButton]=useState("Show");

    const navigation=useNavigate();

    // useEffect(()=>{
    //     fetch("http://localhost:5000/Tx")
    //     .then(res=>{
    //         return res.json();
    //     })
    //     .then(data=>{
    //         setFromAddress(data.fromAddress);
    //         setKey(data.signatureKey)
    //     }).catch(err=>{
    //         console.log(`Err: ${err}`);
    //     })
    // },[]);

    function createTx(){
        if (amount<=0){
            alert("Amount must not less than or equal to 0");
            return;
        }

        fetch("http://localhost:5000/createTx",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fromAddress: fromAddress,
                toAddress: toAddress,
                amount: amount,
                signatureKey: signatureKey
            })
        }).then(res=>{
            alert("Successfully created Transaction");
            navigation(-1);
            //console.log(`Success ${res}`);
        }).catch(err=>{
            console.log(`Err ${err}`);
        })
    }

    function changeAmount(event){
        //console.log(event.target.value);
        setAmount(event.target.value);
    }

    function changeFromAddress(event){
        setFromAddress(event.target.value);
    }

    function changeToAddress(event){
        //console.log(event.target.value);
        setToAddress(event.target.value);
    }

    function changeSignatureKey(event){
        setSecurityKey(event.target.value);
    }

    function securitymode(){
        if (type=="password"){
            setTextButton("Hide");
            setType("text");
        } else {
            setTextButton("Show");
            setType("password");
        }
            
    }

    return (
        <div className="txcreation">
            
                <Form>
                    <Form.Group>
                        <Form.Label htmlFor="from">From Address</Form.Label>
                        <Form.Control id="from" type={"text"} value={fromAddress} onChange={changeFromAddress}/>
                    </Form.Group>

                    
                    <Form.Group>
                        <Form.Label htmlFor="to">To Address</Form.Label>
                        <Form.Control id="to" type={"text"} value={toAddress} onChange={changeToAddress}/>
                    </Form.Group>


                    <Form.Group>
                        <Form.Label htmlFor="amount">Amount</Form.Label>
                        <Form.Control id="amount" type={"number"} value={amount} onChange={changeAmount}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="signature">Signature</Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl
                                id="signature"
                                aria-label="Signature"
                                aria-describedby="basic-addon"
                                type={type}
                                value={signatureKey}
                                onChange={changeSignatureKey}
                            />
                            
                            <Button variant="outline-secondary" id="button-addon" onClick={securitymode}>
                                {textButton}
                            </Button>
                        </InputGroup>    
                    </Form.Group>

                    


                    <Button variant="primary" id="create-btn" onClick={createTx}>Sign & create transaction</Button>
                </Form>
                

            
        
    
        
        
        </div>
    );
}

export default TxCreation;