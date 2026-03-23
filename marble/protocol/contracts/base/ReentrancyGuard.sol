// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

abstract contract ReentrancyGuard {
    uint256 private _status = 1;

    modifier nonReentrant() {
        require(_status == 1, "Reentrant call");
        _status = 2; // lock
        _; // run the function being modified
        _status = 1; // unlock
    }
}

/*
This modifier is designed to protect against a malicious contract calling an important function multiple times during one contract call.
This locks a function from being re-entered mid-execution within the same transaction.
This won't affect any other expected functionality as contracts run sequentially.
*/
