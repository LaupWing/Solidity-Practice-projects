//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Campaign {
   struct Request {
      string description;
      uint value;
      address recipient;
      bool complete;
   }

   modifier restricted() {
      require(msg.sender == manager);
      _;
   }

   Request[] public requests;
   address public manager;
   uint public minimum_contribution;
   address[] public approvers;

   constructor(uint minimum){
      manager = msg.sender;
      minimum_contribution = minimum;
   }

   function contribute() public payable{
      require(msg.value > minimum_contribution);
      approvers.push(msg.sender);
   }
}
