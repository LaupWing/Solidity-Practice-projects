//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// import "hardhat/console.sol";

contract CampaignFactory {
   address[] public deployedCampaigns;

   constructor(string memory name, uint minimum){
      address newCampaign = address(new Campaign(name, minimum, msg.sender));
      deployedCampaigns.push(newCampaign);
   }

   function getDeployedCampaigns() public view returns (address[] memory){
      return deployedCampaigns;
   }
}

contract Campaign{
   struct Request{
      string description;
      uint value;
      address recipient;
      bool complete;
      uint approvalCount;
      mapping(address => bool) approvals;
   }

   address public manager;
   uint public minimum_contribution;
   string public name;
   Request[] public requests;
   mapping (address => bool) approvers;

   modifier restricted() {
      require(msg.sender == manager);
      _;
   }

   constructor(
      string memory _name,
      uint _minimum,
      address creator
   ){
      manager = creator;
      name= _name;
      minimum_contribution = _minimum;
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
      Request storage newRequest = requests.push();
      newRequest.description = _description;
      newRequest.value = _value;
      newRequest.recipient = _recipient;
      newRequest.complete = false;
      newRequest.approvalCount = 0;
   }

   function approveRequest(uint index) public{
      Request storage request = requests[index];

      require(approvers[msg.sender]);
      require(!request.approvals[msg.sender]);

      request.approvals[msg.sender] = true;
      request.approvalCount ++;
   }
}
