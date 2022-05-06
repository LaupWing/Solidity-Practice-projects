//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Campaign {
   address public manager;
   uint public minimum_contribution;

   constructor(uint minimum){
      manager = msg.sender;
      minimum_contribution = minimum;
   }
}
