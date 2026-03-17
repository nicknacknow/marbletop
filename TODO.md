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
     - ^ create 'Bank' contract. simple deposit & withdraw, then transfer, etc
   - [ ] learn more about events, errors, structs & other things solidity
   - [ ] investigate off-chain computation (indexers)
   - [ ] learn about why structs / events gotta be stored memory-efficiently 
   - [ ] make a proper pot
   - [ ] zero knowledge proofs to prove correctness

 - FRONTEND:
   - [ ] event handling, contract & frontend
   - [ ] handle accountsChanged metamask event
   - [ ] tidy up styles.css
   - [ ] (later) leaderboard?
   - [ ] use artifacts for generated ABI
   - [x] fix css styling js
   - [x] clickme button functionality (!)


 - test in workspace first & learn properly. continue investigating & figuring things out for myself
 - create a listener service for contract to save unnecessary writes on blockchain. write off-chain based on events. should this be on backend for the web page? then http get 
  - onload client subscribes, server then waits for contract emit, then publishes to subscribers. 


NOTES:
 - perhaps every ~100 tokens mined, create a pot? protocol-based generation
 - stake floating pot balance
 - streaks , leaderboard for this etc , stacks?

# will do
Maybe create a backend service, at first purely to listen to events to serve to frontend? Rather than requiring frontend to register. Could do a nice UX/UI to 'Assign Wallet' or some button which then prompts MetaMask.  'Connect Wallet' ?
This is important because currently need to connect wallet in order to look at contract, i.e. get/fetch values. This may be bad deisgn? Asking to connect wallet on page load lol. Not sure.
If you subscribe to values on server, frontend onload could fetch values from server. This way can view frontend fine, just can't interact. 