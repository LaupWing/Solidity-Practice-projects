//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Lottery {
   address public manager;
   address payable[] public players;
   mapping(address => uint) public enteesFees;
   uint256 public minimum;
   address private winner;

   event WinnerIs (
      address winner
   );
   event NewEntered (
      address entee
   );

   modifier restricted {
      require(msg.sender == manager, "Only manager can do this");
      _;
   }

   constructor (uint _minimum){
      manager = msg.sender;
      minimum = _minimum;
   }

   function enter() public payable {
      require(msg.value > minimum, 'Doesnt met the enter fee');

      players.push(payable(msg.sender));
      enteesFees[msg.sender] = msg.value;
      emit NewEntered(msg.sender);
   }

   function random() public view returns(uint){
      return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
   }

   function isManager() public view returns(bool){
      return msg.sender == manager;
   }

   function pickWinner() public restricted {
      uint index = random() % players.length;
      players[index].transfer(address(this).balance);
      winner = players[index];
      emit WinnerIs(players[index]);
      players = new address payable[](0);
      for(uint i=0; i< players.length; i++){
         address payable _p = players[i];
         enteesFees[_p] = 0;
      }
   }

   function getPlayers() view public returns(address[] memory){
      address[] memory _players = new address[](players.length);

      for(uint i=0; i<players.length; i++){
         address payable _p = players[i];
         _players[i] = address(_p);
      }
      return _players;
   }

   function haveIWon() view public returns(bool){
      return msg.sender == winner;
   }
}
