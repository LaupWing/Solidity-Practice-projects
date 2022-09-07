// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";

contract RandomIpfsNft is VRFConsumerBaseV2, ERC721 {
   enum Breed {
      PUG,
      SHIBA_INU,
      ST_BERNARD
   }

   VRFCoordinatorV2Interface private immutable i_vrfCoordinator; 
   uint64 private immutable i_subscriptionId;
   bytes32 private immutable i_gasLane;
   uint32 private immutable i_callbackGasLimit;
   uint16 private constant REQUEST_CONFIRMATIONS = 3;
   uint32 private constant NUM_WORDS = 1;
   
   mapping(uint256 => address) public s_requestIdToSender;

   uint256 public s_tokenCounter;
   uint256 internal constant MAX_CHANCE_VALUE = 100;

   constructor(
      address vrfCoordinatorV2,
      uint64 subscriptionId,
      bytes32 gasLane,
      uint32 callbackGasLimit
   ) VRFConsumerBaseV2(vrfCoordinatorV2) ERC721("Random IPFS NFT", "RIN"){
      i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
      i_subscriptionId = subscriptionId;
      i_gasLane = gasLane;
      i_callbackGasLimit = callbackGasLimit;
   }

   function requestNft() public returns(uint256 requestId){
      requestId = i_vrfCoordinator.requestRandomWords(
         i_gasLane,
         i_subscriptionId,
         REQUEST_CONFIRMATIONS,
         i_callbackGasLimit,
         NUM_WORDS
      );
      s_requestIdToSender[requestId] = msg.sender;
      return requestId;

   }

   function fulfillRandomWords(uint requestId, uint256[] memory randomWords) internal override{
      address dogOwner = s_requestIdToSender[requestId];
      uint256 newTokenId = s_tokenCounter;
      _safeMint(dogOwner, newTokenId);
      uint256 moddedRng = randomWords[0] & MAX_CHANCE_VALUE;
   }

   function getBreedFromModdedRng(uint256 moddedRng) public pure returns(Breed){
      uint256 cumulativeSum = 0;
      uint256[3] memory chanceArray = getChanceArray();

      for(uint256 i=0; i<chanceArray.length; i++){
         if(moddedRng >= cumulativeSum && moddedRng < cumulativeSum + chanceArray[i]){
            return Breed(i);
         }
         cumulativeSum += chanceArray[i];
      }
   }

   function getChanceArray() public pure returns(uint256[3] memory){
      return [10, 30, MAX_CHANCE_VALUE];
   }

   function tokenURI(uint256) public view override returns(string memory) {}
}