//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Campaign {
   struct Request {
      string description;
      uint value;
      address recipient;
      bool completed;
      uint approvalCount;
      mapping(address => bool) approvals;
   }

   modifier restricted() {
      require(msg.sender == manager);
      _;
   }

   Request[] public requests;
   address public manager;
   uint public minimum_contribution;
   // address[] public approvers;
   mapping (address => bool) approvers;

   constructor(uint minimum){
      manager = msg.sender;
      minimum_contribution = minimum;
   }

   function contribute() public payable{
      require(msg.value > minimum_contribution);
      approvers[msg.sender] = true;
   }

   function createRequest(
      string memory description,
      uint value,
      address recipient
   ) public restricted{
      require(approvers[msg.sender]);
      Request memory newRequest = Request({
         description: description,
         value: value,
         recipient: recipient,
         completed: false,
         approvalCount: 0
      });

      requests.push(newRequest);
   }
}
