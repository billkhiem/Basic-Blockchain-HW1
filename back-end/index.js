import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { BlockChain, Transaction } from "./blockchain.js";
const app=express();
import { myKey, myWalletAddress} from "./key/key.js";
import EC from "elliptic";
import * as uuid from "uuid";


const ec=new EC.ec("secp256k1");
const blockchain=new BlockChain();


const jsonParser=bodyParser.json();
const urlencodedParser=bodyParser.urlencoded({extended: false});

app.use(cors());

app.get("/home",function(req,res){
    const blocks=blockchain.chain;
    res.json({
        blocks:blocks
    });
});

app.get("/createWallet",function(req,res){
    const key=ec.genKeyPair();
    const publicKey=key.getPublic("hex");
    const privateKey=key.getPrivate("hex");
    res.json({
        msg:"Key has been generated",
        publicKey:publicKey,
        privateKey: privateKey
    });
});

app.post("/createTx",jsonParser,function(req,res){
    
    const amount=parseInt(req.body.amount);
    const id=uuid.v1();
    const newTx=new Transaction(id,req.body.fromAddress,req.body.toAddress,amount);
    const signingKey=ec.keyFromPrivate(req.body.signatureKey);
    newTx.signTransaction(signingKey);
    blockchain.addTransaction(newTx);
    res.json({
        msg:"Transaction has been added"
    });
});

app.get("/settings",function(req,res){
    res.json({
        difficulty: blockchain.difficulty,
        miningReward: blockchain.miningReward
    });
});

app.get("/Tx",function(req,res){
    res.json({
        fromAddress: myWalletAddress,
        signatureKey:myKey.getPrivate("hex")
    });
})
app.post("/changeSettings",jsonParser,function(req,res){
    //console.log("Submitted");
    //console.log(req.body);
    blockchain.difficulty=req.body.difficulty;
    blockchain.miningReward=req.body.miningReward;
    res.json({
        msg:"Changed successfully"
    })
});

app.get("/history",function(req,res){
    res.json({
        difficulty:blockchain.difficulty,
        chain: blockchain.chain
    });
});

app.get("/pendingTx",function(req,res){
    res.json({
        pendingTransactions: blockchain.pendingTransactions
    });
});


app.get("/mine",function(req,res){
    blockchain.minePendingTransactions("anonymous-miner");
    res.json({
        msg:"Mining completed successfully"
    });
})

app.listen(5000,function(){
    console.log("Server stated on port 5000");
});