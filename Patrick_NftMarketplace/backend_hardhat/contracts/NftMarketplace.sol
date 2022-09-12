// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

error NftMarketplace__PriceMustBeAboveZero();
error NftMarketplace__NotApprovedForMarketplace();
error NftMarketplace__AlreadyListed(
   address nftAddress,
   uint256 tokenId
);

contract NftMarketplace{

   event ItemListed(
      address indexed seller,
      address indexed nftAddress,
      uint256 indexed tokenId,
      uint256 price
   );

   struct Listing {
      uint256 price;
      address seller;
   }
   // NFT Contract address -> NFT TokenId -> Listing
   mapping(address => mapping(uint256 => Listing)) private s_listings;

   modifier notListed(address nftAddress, uint256 tokenId, address owner){
      Listing memory listing = s_listings[nftAddress][tokenId];
      if(listing.price > 0){
         revert NftMarketplace__AlreadyListed(nftAddress, tokenId);
      }
   }

   function listItem(
      address nftAddress, 
      uint256 tokenId, 
      uint256 price
   ) external {
      if(price <= 0) {
         revert NftMarketplace__PriceMustBeAboveZero();
      }   

      IERC721 nft = IERC721(nftAddress);
      if(nft.getApproved(tokenId) != address(this)){
         revert NftMarketplace__NotApprovedForMarketplace();
      }
      s_listings[nftAddress][tokenId] = Listing(price, msg.sender);
      emit ItemListed(msg.sender, nftAddress, tokenId, price);
   }
}