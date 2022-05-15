//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Campaign {
   struct Request {
      string description;
      uint value;
      address payable recipient;
      bool completed;
      uint approvalCount;
      mapping(address => bool) approvals;
   }

   modifier restricted() {
      require(msg.sender == manager);
      _;
   }

   event NewContributor(
      address contributor,
      uint approverCount
   );

   uint numRequests;
   // Request[] public requests;
   address public manager;
   uint public minimum_contribution;
   string public name;
   // address[] public approvers;
   mapping (address => bool) approvers;
   mapping( uint => Request) requests;
   uint public approversCount;

   constructor(
      string memory _name, 
      uint _minimum
   ){
      manager = msg.sender;
      name = _name;
      minimum_contribution = _minimum;
   }

   function contribute() public payable{
      require(msg.value > minimum_contribution, "Minimum contribution not met");
      approvers[msg.sender] = true;
      approversCount++;
   }

   function createRequest(
      string memory _description,
      uint _value,
      address _recipient
   ) public restricted{
      Request storage newRequest = requests[numRequests++];
      newRequest.description = _description;
      newRequest.value = _value;
      newRequest.recipient = payable(_recipient);
      newRequest.completed = false;
      newRequest.approvalCount = 0;
   }

   function approveRequest(uint index) public {
      Request storage request = requests[index];

      require(approvers[msg.sender]);
      require(!request.approvals[msg.sender]);

      request.approvals[msg.sender] = true;
      request.approvalCount++;
   }

   function finalizeRequest(uint index) public restricted {
      Request storage request = requests[index];

      require(request.approvalCount > (approversCount /2));
      require(!requests[index].completed);
      request.completed = true;

      request.recipient.transfer(request.value);
   }
}
