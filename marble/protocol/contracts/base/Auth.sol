// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

abstract contract Auth {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _; // continue function after owner check.
    }
}

/*
Stores the deployer's address as the owner of the contract.
onlyOwner modifier restricts functions to only be callable by the owner.
Inherit this contract to add owner-based access control without any external dependencies.
*/
