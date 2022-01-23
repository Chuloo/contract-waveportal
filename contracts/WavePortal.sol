// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    uint256 seed;

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }
    Wave[] waves;

    event NewWave(address indexed from, uint256 timestamp, string message);

    constructor() payable{
        console.log("Yo yo, I am contract, I am smart and deployed by William!!!");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    mapping(address => uint256) public lastWavedAt;

    function wave(string memory _message) public {

        require(lastWavedAt[msg.sender] + 1 minutes < block.timestamp, "Wait 15mins");

        totalWaves += 1;
        console.log("%s has waved", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));
        lastWavedAt[msg.sender] = block.timestamp;

        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated %d", seed );

        if(seed <= 70){
            uint256 prizeMoney = 0.0001 ether;
            
            console.log("Congrats! You won!", msg.sender, prizeMoney);

            require(prizeMoney <= address(this).balance, 
            "You need more ETH in the contract!");

            (bool success, ) = (msg.sender).call{value: prizeMoney}("");
            require(success, "Failed to send the prizemoney and withdraw money from the contract");
        }
        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getTotalWaves() public view returns (uint256){
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function getAllWaves() public view returns(Wave[] memory){
        return waves;
    }

    function removeWave() public {
        totalWaves -= 1;
        console.log("One wave has been taken back by %s", msg.sender);
    }
}