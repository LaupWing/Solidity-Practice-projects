// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";

contract RandomIpfsNft is VRFConsumerBaseV2 {
   function requestNft() public{}

   function fulfillRandomWords(uint requestId, uint256[] memory randomWords) internal override{}

   function tokenURI(uint256) public {}
}