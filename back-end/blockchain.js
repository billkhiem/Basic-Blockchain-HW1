import SHA256 from "crypto-js/sha256.js";
import EC from "elliptic";
import * as uuid from "uuid";

const ec=new EC.ec("secp256k1");
//const SHA256=require("crypto-js/sha256");
class Transaction {
    constructor(id,fromAddress,toAddress,amount,validity=false){
        this.id=id;
        this.fromAddress=fromAddress;
        this.toAddress=toAddress;
        this.amount=amount;
        this.validity=validity;
    }

    calculateHash(){
        return SHA256(this.fromAddress+this.toAddress+this.amount).toString();
    }

    signTransaction(signingKey){
        //console.log("DYLAN");
        //console.log("PUBLIC:"+signingKey.getPublic("hex"));
        //console.log("FROM:"+this.fromAddress);
        if (signingKey.getPublic("hex")!=this.fromAddress){
            throw new Error("You cannot sign transactions for other wallets!!!");
        }


        const hashTx=this.calculateHash();
        const sign=signingKey.sign(hashTx,"base64");
        this.signature=sign.toDER("hex");
        this.validity=true;
    }

    isValid(){
        if (this.fromAddress == null) return true;
        if (!this.signature || this.signature.length==0){
            throw new Error("No signature in this transaction");
        }

        const publicKey=ec.keyFromPublic(this.fromAddress,"hex");
        return publicKey.verify(this.calculateHash(),this.signature);

    }
}

class Block {
    constructor(id,timestamp, transactions, previousHash=""){
        this.id=id;
        this.timestamp=timestamp;
        this.transactions=transactions;
        this.previousHash=previousHash;
        this.nounce=0;
        this.hash=this.calculateHash();
        
    }

    calculateHash(){
        return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.transactions)+this.nounce).toString();
    }

    mineBlock(difficulty){
        while (this.hash.substring(0,difficulty)!=Array(difficulty+1).join("0")){
            this.nounce++;
            this.hash=this.calculateHash();
        }

        console.log("Block mined: "+this.hash);
    }

    hasValidTransactions(){
        for (const ts of this.transactions){
            if (!ts.isValid())
                return false;
        }
        return true;
    }
}

class BlockChain {
    constructor(){
        this.chain=[this.createGenesisBlock()];
        this.difficulty=1;
        this.pendingTransactions=[];
        this.miningReward=100;
    }

    createGenesisBlock(){
        return new Block(uuid.NIL,Date.parse("2022-06-01"),[],"0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    // addBlock(newBlock){
    //     newBlock.previousHash=this.getLatestBlock().hash;
    //     //newBlock.hash=newBlock.calculateHash();
    //     newBlock.mineBlock(this.difficulty);
    //     this.chain.push(newBlock);
    // }

    minePendingTransactions(miningRewardAddress){
        const id_tx=uuid.v1();
        const rewardTransaction=new Transaction(id_tx,null,miningRewardAddress,this.miningReward,true);
        this.pendingTransactions.push(rewardTransaction);
        const id_bk=uuid.v4();
        let block=new Block(id_bk,Date.now(),this.pendingTransactions,this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);
        console.log("Block successfully mined!");
        this.chain.push(block);
        this.pendingTransactions=[];
        //console.log("PEnding",this.pendingTransactions);
    }

    addTransaction(transaction){

        if (!transaction.fromAddress || !transaction.toAddress){
            throw new Error("Transaction must include from and to address");
        }

        if (!transaction.isValid()){
            throw new Error("Cannot add invalid transaction to chain");
        }
        this.pendingTransactions.push(transaction);
    }

    getBalanceofAddress(address){
        let balance=0;
        for (const block of this.chain){
            for (const tran of block.transactions) {
                if (tran.fromAddress==address){
                    balance-=tran.amount;
                }
                if (tran.toAddress==address){
                    balance+=tran.amount;
                }
            }
        }
        return balance;
    }
    isChainValid(){
        for (let i=1;i<this.chain.length;i++){
            const currentBlock=this.chain[i];
            const previousBlock=this.chain[i-1];
            //console.log("Previous block",previousBlock);
            //console.log("Current block",currentBlock);
            if (!currentBlock.hasValidTransactions()) {
                return false;
            }
            if (currentBlock.hash!=currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash!=previousBlock.hash){
                return false;
            }
        }
        //console.log("Length of chain:",this.chain.length);
        return true;
    }

}

export { BlockChain, Transaction};