// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Staking is ERC20 {
    uint256 public rewardRate;
    address owner; // Reward rate per second

    struct Stake {
        uint256 amount;
        uint256 stakedAt;
    }

    mapping(address => Stake) public stakes;

    constructor(
        string memory name,
        string memory symbol,
        uint256 _rewardRate
    ) ERC20(name, symbol) {
        rewardRate = _rewardRate;
        owner = msg.sender;
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(
            stakes[msg.sender].amount == 0,
            "Only one stake per address is allowed"
        );

        // Transfer tokens from the sender to the contract
        _transfer(msg.sender, address(this), amount);

        // Store the stake details
        stakes[msg.sender] = Stake(amount, block.timestamp);
    }

    function unstake() external {
        Stake storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No stake found");

        uint256 reward = calculateReward(msg.sender);
        uint256 stakedAmount = userStake.amount;

        // Remove the stake to resist re-enterancy attack
        delete stakes[msg.sender];

        // Transfer the staked amount and reward to the sender
        _transfer(address(this), msg.sender, stakedAmount + reward);
    }

    function calculateReward(address staker) public view returns (uint256) {
        Stake memory userStake = stakes[staker];
        uint256 stakingDuration = block.timestamp - userStake.stakedAt;

        return userStake.amount * rewardRate * stakingDuration;
    }

    function mintToken(uint amount, address account) public {
        require(msg.sender == owner, "only owner allow to mint tokens");
        _mint(account, amount);
    }
}
