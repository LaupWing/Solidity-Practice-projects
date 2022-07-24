//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract CampaignFactory {
   address[] public deployedCampaigns;

   function createCampaign(
      string memory name, 
      uint minimum,
      uint goal,
      string memory description,
      string memory thumbnail
   ) public {
      address newCampaign = address(new Campaign(name, minimum, goal, msg.sender, description, thumbnail));
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
      mapping(address => bool) denials;
   }

   Request[] public requests;
   address public immutable manager;
   uint public minimum_contribution;
   mapping (address => bool) public approvers;
   uint public goal;
   uint public approversCount;
   string public name;
   string public description;
   string public thumbnail;

   modifier restricted() {
      require(msg.sender == manager, "Only manager allowed");
      _;
   }

   modifier canAnswer(uint index) {
      Request storage request = requests[index];

      require(approvers[msg.sender]);
      require(!request.approvals[msg.sender]);
      require(!request.denials[msg.sender]);
      _;
   }

   constructor(
      string memory _name,
      uint _minimum,
      uint _goal,
      address creator,
      string memory _description,
      string memory _thumbnail
   ){
      manager = creator;
      name = _name;
      description = _description;
      goal = _goal;
      thumbnail = _thumbnail;
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

   function answeredRequest(uint index) public view returns(bool, bool){
      Request storage request = requests[index];

      return (
         request.approvals[msg.sender],
         request.denials[msg.sender]
      );
   }

   function approveRequest(uint index) public canAnswer(index){
      Request storage request = requests[index];

      request.approvals[msg.sender] = true;
      request.approvalCount ++;
   }

   function denyRequest(uint index) public canAnswer(index){
      Request storage request = requests[index];

      request.denials[msg.sender] = true;
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

   function summary() public view returns(
      uint, 
      uint, 
      uint, 
      address, 
      string memory, 
      string memory, 
      string memory
   ){
      return (
         minimum_contribution, 
         goal,
         address(this).balance,
         manager,
         thumbnail,
         description,
         name
      );
   }
}
