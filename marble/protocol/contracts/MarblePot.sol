// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MarblePot {
    struct Pot {
        address creator;
        string name;
        bool isOpen;
        uint256 totalDeposited;
        uint256 totalWithdrawn;
    }

    error InvalidPotId();
    error PotIsClosed();
    error NotCreator();
    error ZeroAmount();
    error InsufficientPotBalance();

    event PotCreated(
        uint256 indexed potId,
        address indexed creator,
        string name
    );
    event Deposited(
        uint256 indexed potId,
        address indexed contributor,
        uint256 amount,
        uint256 newTotalBalance
    );
    event Withdrawn(
        uint256 indexed potId,
        address indexed creator,
        uint256 amount,
        uint256 remainingBalance
    );
    event PotClosed(uint256 indexed potId);

    uint256 private _potCount;
    mapping(uint256 => Pot) private _pots;
    mapping(uint256 => mapping(address => uint256)) private _contributions;

    function createPot(string calldata name) external returns (uint256 potId) {
        potId = _potCount;
        _pots[potId] = Pot({
            creator: msg.sender,
            name: name,
            isOpen: true,
            totalDeposited: 0,
            totalWithdrawn: 0
        });

        unchecked {
            _potCount += 1;
        }

        emit PotCreated(potId, msg.sender, name);
    }

    function deposit(uint256 potId) external payable {
        Pot storage pot = _requireValidPot(potId);

        if (!pot.isOpen) {
            revert PotIsClosed();
        }
        if (msg.value == 0) {
            revert ZeroAmount();
        }

        pot.totalDeposited += msg.value;
        _contributions[potId][msg.sender] += msg.value;

        emit Deposited(potId, msg.sender, msg.value, _potBalance(pot));
    }

    function withdraw(uint256 potId, uint256 amount) external {
        Pot storage pot = _requireValidPot(potId);

        if (msg.sender != pot.creator) {
            revert NotCreator();
        }
        if (amount == 0) {
            revert ZeroAmount();
        }

        uint256 balance = _potBalance(pot);
        if (amount > balance) {
            revert InsufficientPotBalance();
        }

        pot.totalWithdrawn += amount;
        (bool ok, ) = payable(pot.creator).call{value: amount}("");
        require(ok, "ETH_TRANSFER_FAILED");

        emit Withdrawn(potId, pot.creator, amount, balance - amount);
    }

    function closePot(uint256 potId) external {
        Pot storage pot = _requireValidPot(potId);

        if (msg.sender != pot.creator) {
            revert NotCreator();
        }

        pot.isOpen = false;
        emit PotClosed(potId);
    }

    function getPot(
        uint256 potId
    )
        external
        view
        returns (
            address creator,
            string memory name,
            bool isOpen,
            uint256 totalDeposited,
            uint256 totalWithdrawn,
            uint256 balance
        )
    {
        Pot storage pot = _requireValidPotView(potId);
        return (
            pot.creator,
            pot.name,
            pot.isOpen,
            pot.totalDeposited,
            pot.totalWithdrawn,
            _potBalance(pot)
        );
    }

    function getContribution(
        uint256 potId,
        address contributor
    ) external view returns (uint256) {
        _requireValidPotView(potId);
        return _contributions[potId][contributor];
    }

    function potCount() external view returns (uint256) {
        return _potCount;
    }

    function _potBalance(Pot storage pot) private view returns (uint256) {
        return pot.totalDeposited - pot.totalWithdrawn;
    }

    function _requireValidPot(
        uint256 potId
    ) private view returns (Pot storage) {
        if (potId >= _potCount) {
            revert InvalidPotId();
        }
        return _pots[potId];
    }

    function _requireValidPotView(
        uint256 potId
    ) private view returns (Pot storage) {
        if (potId >= _potCount) {
            revert InvalidPotId();
        }
        return _pots[potId];
    }
}
