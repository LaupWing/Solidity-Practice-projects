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

   uint numRequests;
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
      string memory _description,
      uint _value,
      address _recipient
   ) public restricted{
      require(approvers[msg.sender]);
      Request storage newRequest = requests[numRequests++];
      newRequest.description = _description;
      newRequest.value = _value;
      newRequest.recipient = _recipient;
      newRequest.completed = false;
      newRequest.approvalCount = 0;
   }
}
