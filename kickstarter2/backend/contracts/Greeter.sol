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
   address public manager;
   uint public minimum_contribution;
   string public name;

   constructor(
      string memory _name,
      uint _minimum,
      address creator
   ){
      manager = creator;
      name= _name;
      minimum_contribution = _minimum;
   }
}
