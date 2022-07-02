//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// import "hardhat/console.sol";

contract CampaignFactory {
   address[] public deployedCampaigns;

   function createCampaign(string memory name, uint minimum) public {
      address newCampaign = address(new Campaign(name, minimum, msg.sender));
      deployedCampaigns.push(newCampaign);
   }

   function getDeployedCampaigns() public view returns (address[] memory){
      return deployedCampaigns;
   }
}

contract Campaign{
   struct Request{
      string title;
      string description;
      uint value;
      address payable recipient;
      bool complete;
      uint approvalCount;
      mapping(address => bool) approvals;
   }

   Request[] public requests;
   address public manager;
   uint public minimum_contribution;
   mapping (address => bool) public approvers;
   uint public approversCount;
   string public name;

   modifier restricted() {
      require(msg.sender == manager, "Only manager allowed");
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
      require(msg.value > minimum_contribution,  "Minimum contribution not met");
      approvers[msg.sender] = true;
      approversCount++;

   }

   function createRequest(
      string memory _title,
      string memory _description, 
      uint _value, 
      address _recipient
   ) public restricted{
      Request storage newRequest = requests.push();
      newRequest.title = _title;
      newRequest.description = _description;
      newRequest.value = _value;
      newRequest.recipient = payable(_recipient);
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

   function finalizeRequest(uint index) public restricted{
      Request storage request = requests[index];

      require(request.approvalCount > (approversCount / 2), "Not enough people have approved this request");
      require(!request.complete);

      request.recipient.transfer(request.value);
      request.complete = true;
   }

   function getRequestsCount() public view returns(uint){
      return requests.length;
   }

   function getInfo() public view returns (uint, uint, uint, uint){
      return (
         minimum_contribution,
         address(this).balance,
         requests.length,
         approversCount
      );
   }
}
