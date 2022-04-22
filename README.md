# near-cat-nft
Challenge #3
#### NEAR CATS NFT Collection contains 50 images of cats, personally drawn by my hand :)
#### Because this isn't real NFT collection, you can mint tokens as many as you want.
## Project structure
Repository contains two folders:

- nft-uploader
- nft-contract

#### nft-uploader
Contains script, that is used to upload all 50 images to nft.storage using API.

#### nft-contract
Contains smart contract source code, which was builded and deployed to nft.ippishio.testnet

#### nft-frontend(located in root)
Contains all logic behind frontend page using THREE.js and near-api-js libraries. Near.js contains all blokchain integration logic, and Main.js for all other. When mint button is pressed, Near.js generates randID(used for pick random nft from collection), and passes it to the nft_mint() contract method. After approving transaction, there is transactionHash in URL args, which contains response from mint_nft() with the same randID, that was passed. After this, randID is used to render NFT image in THREE.js

