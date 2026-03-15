all in separate terminals:
First, start local blockchain:
```
npm run node
```

Then, deploy local contracts to blockhain
```
npm run deploy:local
```

Copy counter contract address to app.js in frontend

then start frontend:
```
npm run frontend
```
you should now be able to interact, make sure to use metamask.



TODO:

 - FRONTEND:
   - [ ] use artifacts for generated ABI
   - [x] fix css styling js


 - create a listener service for contract to save unnecessary writes on blockchain. write off-chain based on events.