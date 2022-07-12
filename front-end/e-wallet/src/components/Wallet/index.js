import React, { useEffect, useState } from "react";
import {Form, Button, InputGroup, FormControl, FormLabel} from "react-bootstrap";
import "./styles.css";



function CreateWallet(){

    const [publicKey,setPublicKey]=useState("");
    const [privateKey,setPrivateKey]=useState("");
    const [disabled,setDisabled]=useState(false);

    const [type,setType]=useState("password");
    const [textButton,setTextButton]=useState("Show");

    function createNew(){
        fetch("http://localhost:5000/createWallet")
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            setPublicKey(data.publicKey);
            setPrivateKey(data.privateKey);
            alert("Wallet created successfully!");
            setDisabled(true);
        })
        .catch(err=>{
            console.log(`Error ${err}`);
        })
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
        <div className="wallet_creation">
                <h4 className="text-center">Create new wallet</h4>
                {/* <Form>
                    

                    // {<Form.Group>
                    //     <Form.Label htmlFor="name">Name</Form.Label>
                    //     <Form.Control id="name" type={"text"} value={""} onChange={null}/>
                    // </Form.Group>


                    // <Form.Group>
                    //     <Form.Label htmlFor="id">ID</Form.Label>
                    //     <Form.Control id="id" type={"text"} value={""} onChange={null}/>
                    // </Form.Group> 

                    


                    
                </Form> */}
                
                <div className="mt-5">

                    <FormLabel htmlFor="public">New wallet address</FormLabel>
                    <InputGroup className="mb-3">    
                        <FormControl
                            aria-label="public"
                            aria-describedby="basic-addon2"
                            type={"text"}
                            value={publicKey}
                            disabled
                        />
                        
                        
                    </InputGroup>

                    <FormLabel htmlFor="private">New signature key</FormLabel>
                    <InputGroup className="mb-3">
                    
                        <FormControl
                            id="private"
                            aria-label="Private key"
                            aria-describedby="basic-addon2"
                            type={type}
                            value={privateKey}
                            disabled
                        />
                        
                        <Button variant="outline-secondary" id="button-addon2" onClick={securitymode}>
                            {textButton}
                        </Button>
                    </InputGroup>

                    <Button variant="primary" id="create-btn" onClick={createNew} disabled={disabled}>Create</Button>
                </div>
            
        
    
        
        
        </div>
    );
}

export default CreateWallet;