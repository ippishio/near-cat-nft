// connect to NEAR
const { providers } = nearApi;
const { utils } = nearApi;
const near = new nearApi.Near({
    keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore(),
    networkId: 'testnet',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org'
  });

  // connect to the NEAR Wallet
  const wallet = new nearApi.WalletConnection(near, 'my-app');

  // connect to a NEAR smart contract
  const contract = new nearApi.Contract(wallet.account(), 'nft.ippishio.testnet', {
    viewMethods: [],
    changeMethods: ['nft_mint']
  });
  const button = document.getElementById('open');
 const logoutbut = document.getElementById('log-out');
  if (!wallet.isSignedIn()) {
    button.textContent = 'SignIn with NEAR'
    logoutbut.style.visibility = "hidden";
  } else {
    logoutbut.style.visibility = "visible";
  } 

 logoutbut.addEventListener('click', () => {
  wallet.signOut();
  location.href = 'https://'+window.location.hostname;
  window.location.reload();
  console.log("logged out");
 }) 

  
 // Either sign in or call the addMessage change method on button click

var randID;
var isOpen = false;
var isSignedIn = wallet.isSignedIn();
//network config (replace testnet with mainnet or betanet)
const provider = new providers.JsonRpcProvider(
  "https://archival-rpc.testnet.near.org"
);
const TX_HASH = new URLSearchParams(window.location.search).get('transactionHashes');
if(wallet.isSignedIn()) {
  if(TX_HASH) {
   if(!(new URLSearchParams(window.location.search).get('errorCode'))) {
      console.log("no error");
     const result = await provider.txStatus(TX_HASH, wallet.getAccountId().toString());
     randID = parseInt(window.atob(result['status']['SuccessValue']));
     if(randID){
        console.log(randID);
        isOpen = true;
     }
   } else {
     console.log("error");
    }

  console.log(TX_HASH);
  }
}
export {randID, isOpen, isSignedIn}




  button.addEventListener('click', () => {
    if (wallet.isSignedIn()) {
      const randomid = Math.floor(Math.random() * 49)+1;
      contract.nft_mint({
        token_id: (Math.floor(Math.random() * 900000000)+1).toString(), 
        metadata: {"title":"UGLY CAT NFT #"+randomid.toString(),"description":"A little funny looking cat","media":"https://bafybeidf7fvevqcn4ulumwwefedlg343qy2rsgg27ev4fpaz57iwywwnby.ipfs.nftstorage.link/images/"+randomid.toString()+".png"},
        receiver_id: wallet.getAccountId().toString(),
        image_number: randomid
      },"300000000000000","100000000000000000000000"
      ) 
      isSignedIn = true;
    } else {
      wallet.requestSignIn({
        contractId: 'nft.ippishio.testnet',
        methodNames: ['nft_mint']
      });
      isSignedIn = false;
    }
  });