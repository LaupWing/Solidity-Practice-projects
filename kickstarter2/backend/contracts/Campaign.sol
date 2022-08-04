//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract CampaignFactory {
   address[] public deployedCampaigns;
   AggregatorV3Interface public priceFeed;

   function createCampaign(
      string memory name, 
      uint minimum,
      uint goal,
      string memory description,
      string memory thumbnail,
      address priceFeedAddress
   ) public {
      address newCampaign = address(new Campaign(name, minimum, goal, msg.sender, description, thumbnail, priceFeed));
      deployedCampaigns.push(newCampaign);
   }

   constructor(address priceFeedAddress){
      priceFeed = AggregatorV3Interface(priceFeedAddress);
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
   address public immutable i_manager;
   uint public immutable i_minimum_contribution;
   uint public immutable i_goal;
   mapping (address => bool) public approvers;
   uint public approversCount;
   string public name;
   string public description;
   string public thumbnail;
   AggregatorV3Interface public priceFeed;

   modifier restricted() {
      require(msg.sender == i_manager, "Only manager allowed");
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
      string memory _thumbnail,
      AggregatorV3Interface _priceFeed
   ){
      i_manager = creator;
      name = _name;
      description = _description;
      i_goal = _goal;
      thumbnail = _thumbnail;
      i_minimum_contribution = _minimum;
      priceFeed = _priceFeed;
   }

   function contribute() public payable{
      require(msg.value > i_minimum_contribution,  "Minimum contribution not met");
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
         i_minimum_contribution, 
         i_goal,
         address(this).balance,
         i_manager,
         thumbnail,
         description,
         name
      );
   }
}
