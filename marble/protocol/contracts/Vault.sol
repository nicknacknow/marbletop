// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./base/Auth.sol";
import "./base/ReentrancyGuard.sol";

error NothingToWithdraw();
error InsufficientBalance();
error TransferFailed();
error NothingSent();

contract Vault is Auth, ReentrancyGuard {
    mapping(address => uint256) private balances;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);

    function deposit() external payable {
        if (msg.value == 0) revert NothingSent();
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external nonReentrant {
        if (amount == 0) revert NothingToWithdraw();
        require(balances[msg.sender] >= amount, "Insufficient balance"); // check

        uint256 _balance = balances[msg.sender]; // cache storage read
        if (_balance < amount) revert InsufficientBalance();

        balances[msg.sender] = _balance - amount; // effect

        // interactions
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        if (!success) revert TransferFailed();

        emit Withdrawn(msg.sender, amount);
    }

    function balance() external view returns (uint256) {
        return balances[msg.sender];
    }
}
