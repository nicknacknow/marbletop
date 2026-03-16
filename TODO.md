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
 - CONTRACT:
   - [ ] learn mappings
   - [ ] get money transfers working
   - [ ] learn more about events, errors, structs & other things solidity
   - [ ] investigate off-chain computation (indexers)
   - [ ] learn about why structs / events gotta be stored memory-efficiently 
   - [ ] make a proper pot

 - FRONTEND:
   - [ ] event handling, contract & frontend
   - [ ] handle accountsChanged metamask event
   - [ ] (later) leaderboard?
   - [ ] use artifacts for generated ABI
   - [x] fix css styling js
   - [x] clickme button functionality (!)


 - test in workspace first & learn properly. continue investigating & figuring things out for myself
 - create a listener service for contract to save unnecessary writes on blockchain. write off-chain based on events. should this be on backend for the web page? then http get 


NOTES:
 - perhaps every ~100 tokens mined, create a pot? protocol-based generation
 - stake floating pot balance
 - streaks , leaderboard for this etc , stacks?