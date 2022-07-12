import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./styles.css";
import Form from "react-bootstrap/Form";
//import 'bootstrap/dist/css/bootstrap.min.css';

function Settings() {

    const [miningReward,setMiningReward]=useState(0);
    const [difficulty,setDifficulty]=useState(0);
    useEffect(()=>{
        fetch("http://localhost:5000/settings")
        .then(res=> {
            return res.json();
        })
        .then(data=>{
            //console.log(data.difficulty);
            setDifficulty(data.difficulty);
            setMiningReward(data.miningReward);
        });
    },[]);

    function changeDifficulty(e){
        //console.log("Change difficulty");
        console.log(e.target.value);
        const num=parseInt(e.target.value);
        //console.log(typeof num);
        setDifficulty(num);
    }

    function changeMiningReward(e){
        console.log(e.target.value);
        setMiningReward(e.target.value);
    }

    function saveChanges(){
        fetch("http://localhost:5000/changeSettings",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                difficulty: difficulty,
                miningReward: miningReward
            })
        }).then(res=>{
            alert("Successfully changed");
            //console.log(`Success ${res}`);
        }).catch(err=>{
            console.log(`Error ${err}`)
        });
        // console.log(difficulty);
        // console.log(miningReward);
    }
    return (
        <>
            
            <div className="settings">
                <h5 className="text-center">Mining Settings</h5>
                <Form>
                    <Form.Group>
                        <Form.Label htmlFor="difficulty">Difficulty</Form.Label>
                        <Form.Control id="difficulty" type={"number"} 
                            value={difficulty} onChange={changeDifficulty}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="reward">Mining reward</Form.Label>
                        <Form.Control id="reward" type={"number"} value={miningReward} 
                            onChange={changeMiningReward}/>
                    </Form.Group>

                    <Button variant="primary" className="mt-3" onClick={saveChanges}>Save</Button>
                </Form>
            </div>
        </>
        
        
    );
    
}

export default Settings;