// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";
error Raffle__NotEnoughETHEntered();

contract Raffle is VRFConsumerBaseV2, KeeperCompatibleInterface {
   uint256 private immutable i_entranceFee;
   address payable[] private s_players;
   VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
   bytes32 private immutable i_gasLane;
   uint64 private immutable i_subscribtionId;
   uint32 private immutable i_callbackGasLimit;
   uint16 private constant REQUEST_CONFIRMATIONS = 3;
   uint16 private constant NUM_WORDS = 1;

   // Events
   event RaffleEnter(
      address indexed player
   );
   event RequestedRaffleWinner(
      uint256 indexed requestId
   );

   constructor(
      address vrfCoordinatorV2, 
      uint256 entranceFee,
      bytes32 gasLane,
      uint64 subscribtionId,
      uint32 callbackGasLimit
   ) VRFConsumerBaseV2(vrfCoordinatorV2){
      i_entranceFee = entranceFee;
      i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinatorV2);
      i_gasLane = gasLane;
      i_subscribtionId = subscribtionId;
      i_callbackGasLimit = callbackGasLimit;
   }

   function enterRaffle() public payable{
      if(msg.value < i_entranceFee){ 
         revert Raffle__NotEnoughETHEntered();
      }
      s_players.push(payable(msg.sender));
      emit RaffleEnter(msg.sender);
   }

   function checkUpkeep(
      bytes calldata /*checkData */
      ) external override {

   }

   function requestRandomWinner() external {
      uint256 requestId =  i_vrfCoordinator.requestRandomWords(
         i_gasLane, 
         i_subscribtionId, 
         REQUEST_CONFIRMATIONS, 
         i_callbackGasLimit, 
         NUM_WORDS
      );
      emit RequestedRaffleWinner(requestId);
   }

   function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
   }

   function getEntranceFee() public view returns(uint256){
      return i_entranceFee;
   }

   function getPlayer(uint256 index) public view returns(address){
      return s_players[index];
   }
}
