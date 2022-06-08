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
   }

   address public manager;
   uint public minimum_contribution;
   string public name;

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

   }

   function createRequest(
      string memory _description, 
      uint _value, 
      address _recipient
   ) public restricted{
      Request memory newRequest = Request({
         description: _description,
         value: _value,
         recipient: _recipient,
         complete: false
      });
   }
}
