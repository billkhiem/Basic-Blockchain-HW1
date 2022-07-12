import EC from "elliptic";

const ec=new EC.ec("secp256k1");

const myKey=ec.keyFromPrivate("85e0c30b822cba125d580782c573bcf208120d3c6b4ad14a366a88933f9fa149");
const myWalletAddress=myKey.getPublic("hex");

//public key: 042e697237f84285a85dbad0cc1c41e3d0e2da87bf7e805d395b18ac104ff8243bab8ac68b08eed62096ec9cb9eca4a41299a18d260b248b21a2d60d9271724ed8

export {myKey, myWalletAddress};
