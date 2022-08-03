// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter{
   function getPrice(AggregatorV3Interface pricefeed)
      internal
      view
      returns (uint256)
   {
      (, int256 answer, , , ) = pricefeed.latestRoundData();

      return uint256(answer * 10000000000);
   }

   function getConverionRate(uint256 ethAmount, AggregatorV3Interface pricefeed) 
      internal
      view
      returns (uint256)
   {
      uint256 ethPrice = getPrice(pricefeed);
      uint256 ethAmountInUsd = (ethPrice * ethAmount) / 10000000000;
      return ethAmountInUsd;
   }
}