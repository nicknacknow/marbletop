// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Counter {
    mapping(address => uint256) private values;

    event ValueChanged(address indexed caller, uint256 newValue);

    function current() external view returns (uint256) {
        return values[msg.sender];
    }

    function increment() external {
        _set(values[msg.sender] + 1);
    }

    function set(uint256 newValue) external {
        _set(newValue);
    }

    function _set(uint256 newValue) internal {
        // require(newValue < 1000, "Too large");

        values[msg.sender] = newValue;
        // arguably this is bad because we are setting data on-chain. this costs gas. we can avoid this by having a listener from genesis off-chain which calculates value based on events emitted.

        emit ValueChanged(msg.sender, newValue);
    }
}

/*

look into:
mapping(address => uint256) private value; , i.e. each user has own value

*/
