// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";

contract RandomIpfsNft is VRFConsumerBaseV2 {
   VRFCoordinatorV2Interface private immutable i_vrfCoordinator; 
   uint64 private immutable i_subscriptionId;
   bytes32 private immutable i_gasLane;
   uint32 private immutable i_callbackGasLimit;
   uint16 private constant REQUEST_CONFIRMATIONS = 3;
   uint32 private constant NUM_WORDS = 1;

   constructor(
      address vrfCoordinatorV2,
      uint64 subscriptionId,
      bytes32 gasLane,
      uint32 callbackGasLimit
   ) VRFConsumerBaseV2(vrfCoordinatorV2){
      i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
      i_subscriptionId = subscriptionId;
      i_gasLane = gasLane;
      i_callbackGasLimit = callbackGasLimit;
   }

   function requestNft() public{

   }

   function fulfillRandomWords(uint requestId, uint256[] memory randomWords) internal override{}

   function tokenURI(uint256) public {}
}