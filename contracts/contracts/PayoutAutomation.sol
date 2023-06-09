// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 * @title PayoutAutomation
 * @notice A contract for automating prize payments to a winner using Chainlink price feeds.
 * @dev Inherits from Pausable and KeeperCompatibleInterface contracts.
 */
contract PayoutAutomation is Pausable, KeeperCompatibleInterface {
    address public owner; // Address of contract owner
    address private keeperRegistryAddress; // Address of Keeper Registry
    address private winner; // Address of winner
    uint256 public lastTimeStamp; // Previous timestamp variable
    uint256 private prizeUsd; // prize amount in USD
    AggregatorV3Interface internal priceFeed; // Interface for price feed

    
    event WinnerPaid(uint256 date);

    /**
     * @dev Chainlink Price Feed
     * Network: Polygon (Matic) Mainnet
     * Aggregator: MATIC/USD
     * Address: 0xAB594600376Ec9fD91F8e885dADF0CE036862dE0
     * @param _keeperRegistryAddress The address of the Keeper Registry contract
     * @param _prizeUsd The winner's prize amount in USD
     * @param _winner The address of the winner
     */
    constructor(
        address _keeperRegistryAddress,
        uint256 _prizeUsd,
        address _winner
    ) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(
             0xAB594600376Ec9fD91F8e885dADF0CE036862dE0
        );
        setKeeperRegistryAddress(_keeperRegistryAddress);
        setWinnerPrize(_prizeUsd);
        setWinner(_winner);
        lastTimeStamp = block.timestamp;
    }

    /**
     * @notice Fallback function allows contract to receive MATIC.
     */
    receive() external payable {}

    /**
     * @notice Function modifier restricting access to owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    /**
     * @notice Function modifier restricting access to Keeper Registry
     */
    modifier onlyKeeperRegistry() {
        require(msg.sender == keeperRegistryAddress, "Not Keeper Registry");
        _;
    }

    /**
     * @notice Checks if upkeep is needed depending on the time frame
     * @param performData Additional data for upkeep (unused in this implementation)
     * @return upkeepNeeded True if upkeep is needed, false otherwise
     */
    function checkUpkeep(
        bytes calldata performData
    )
        external
        view
        override
        whenNotPaused
        returns (bool upkeepNeeded, bytes memory)
    {
        require(address(this).balance > 0, "Insufficient funds");
        upkeepNeeded = (block.timestamp - lastTimeStamp) > 2592000; // Monthly (30 days * 86400 seconds/day)
        return (upkeepNeeded, "");
    }

    /**
     * @notice Called by the keeper to send MATIC to the winner
     * @param performData Additional data for upkeep (unused in this implementation)
     */
    function performUpkeep(
        bytes calldata performData
    ) external override onlyKeeperRegistry whenNotPaused {
        if ((block.timestamp - lastTimeStamp) > 1209600) {
            lastTimeStamp = block.timestamp;
            payWinner();
        }
    }

    /**
     * @notice Pays the winner in MATIC
     */
    function payWinner() private whenNotPaused {
        uint256 maticPrice = getMaticPrice();
        uint256 maticAmount = (prizeUsd * 1e18) / maticPrice;

        (bool sent, ) = winner.call{value: maticAmount}("");
        require(sent, "Failed to send MATIC");

        emit WinnerPaid(block.timestamp);
    }

    /**
     * @notice Sets the Keeper Registry Address
     * @param _keeperRegistryAddress The address of the Keeper Registry contract
     */
    function setKeeperRegistryAddress(
        address _keeperRegistryAddress
    ) public onlyOwner {
        require(_keeperRegistryAddress != address(0), "Invalid address");
        keeperRegistryAddress = _keeperRegistryAddress;
    }

    /**
     * @notice Gets the Keeper Registry Address
     * @return The address of the Keeper Registry contract
     */
    function getKeeperRegistryAddress() public view returns (address) {
        return keeperRegistryAddress;
    }

    /**
     * @notice Sets the winner's prize
     * @param _prizeUsd The winner's prize amount in USD
     */
    function setWinnerPrize(uint256 _prizeUsd) public onlyOwner {
        require(_prizeUsd > 0, "Prize <= 0");
        prizeUsd = _prizeUsd;
    }

    /**
     * @notice Gets the winner's prize
     * @return The winner's prize amount in USD
     */
    function getWinnerPrize() public view onlyOwner returns (uint256) {
        return prizeUsd;
    }

    /**
     * @notice Sets the winner's address
     * @param _winner The address of the winner
     */
    function setWinner(address _winner) public onlyOwner {
        require(_winner != address(0), "Invalid address");
        winner = _winner;
    }

    /**
     * @notice Gets the winner's address
     * @return The address of the winner
     */
    function getWinner() public view onlyOwner returns (address) {
        return winner;
    }

    /**
     * @notice Funds the contract with MATIC
     */
    function fund() public payable onlyOwner {
        require(msg.value > 0, "Msg.value cannot be 0");
    }

    /**
     * @notice Pauses the contract, which prevents executing performUpkeep
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @notice Unpauses the contract
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @notice Withdraws the contract balance
     * @param amount The amount of MATIC (in wei) to withdraw
     * @param payee The address to pay
     */
    function withdraw(
        uint256 amount,
        address payable payee
    ) external onlyOwner {
        require(payee != address(0), "Invalid address");
        (bool sent, ) = payee.call{value: amount}("");
        require(sent, "Failed to withdraw MATIC");
    }

    /**
     * @notice Gets the latest price of MATIC from the Chainlink price feed
     * @return The latest price of MATIC in USD
     */
    function getMaticPrice() public view returns (uint256) {
        (, int256 _price, , , ) = priceFeed.latestRoundData();
        uint256 price = uint256(_price);
        return price;
    }
}
