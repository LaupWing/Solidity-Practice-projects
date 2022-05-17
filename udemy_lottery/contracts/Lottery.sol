//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Lottery {
   address public manager;
   address payable[] public players;
   uint256 public minimum;

   modifier restricted {
      if(msg.sender == manager) _;
   }

   constructor (uint _minimum){
      manager = msg.sender;
      minimum = _minimum;
   }

   function enter() public payable {
      require(msg.value > minimum, 'Doesnt met the enter fee');

      players.push(payable(msg.sender));
   }

   function random() public view returns(uint){
      return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
   }

   function pickWinner() public restricted {
      uint index = random() % players.length;
      players[index].transfer(address(this).balance);
      players = new address payable[](0);
   }

   function getPlayers() view public returns(address payable[] memory){
      // address[] memory _players;

      // for(uint i=0; i<players.length; i++){
      //    _players[i] = address(players[i]);
      // }
      
      return players;
   }
}
