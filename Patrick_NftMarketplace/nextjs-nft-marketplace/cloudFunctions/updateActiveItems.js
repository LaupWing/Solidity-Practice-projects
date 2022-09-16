// const { default: Moralis } = require("moralis");

Moralis.Cloud.afterSave("ItemListed", async (request)=>{
   const confirmed = request.object.get("confirmed")
   const logger = Moralis.Cloud.getLogger()
   logger.info("Looking for confirmed Tx")
   if(confirmed){
      logger.info("Found item")
      logger.info("loggin request")
      logger.info(request.object.get("nftAddress"))
      const ActiveItem = Moralis.Object.extend("ActiveItem")
      const activeItem = new ActiveItem()
      
      activeItem.set("marketplaceAddress", request.object.get("address"))
      activeItem.set("nftAddress", request.object.get("nftAddress"))
      activeItem.set("price", request.object.get("price"))
      activeItem.set("tokenId", request.object.get("tokenId"))
      activeItem.set("seller", request.object.get("seller"))
      logger.info(`Adding Address ${request.object.get("address")}. TokenId: ${request.object.get("tokenId")}`)
      logger.info("Saving")

      await activeItem.save()
   }
})

Moralis.Cloud.afterSave("ItemCanceled", async request =>{
   const confirmed = request.object.get("confirmed")
   const logger = Moralis.Cloud.getLogger()
   logger.info(`Marketplace | Object ${request.object}`)

   if(confirmed){
      const ActiveItem = Moralis.Object.extend("ActiveItem")
      const query = new Moralis.Query(ActiveItem)

      query.equalTo("marketplaceAddress", request.object.get("address"))
      query.equalTo("nftAddress", request.object.get("nftAddress"))
      query.equalTo("tokenId", request.object.get("tokenId"))
   }

})