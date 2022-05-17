//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Lottery {
   address public manager;
   address[] public players;
   uint256 public minimum;

   constructor (uint _minimum){
      manager = msg.sender;
      minimum = _minimum;
   }

   function enter() public payable {
      require(msg.value > minimum, 'Doesnt met the enter fee');

      players.push(msg.sender);
   }
}
