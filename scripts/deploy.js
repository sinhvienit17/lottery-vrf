const hre = require("hardhat");
const fs = require("fs");
const ethers = hre.ethers;
const upgrades = hre.upgrades;

async function main() {
  //Loading accounts
  const accounts = await ethers.getSigners();
  const addresses = accounts.map((item) => item.address);
  const admin = addresses[0];

  const NFT = await ethers.getContractFactory("NFTCreator");
  const NFTLotteryPool = await ethers.getContractFactory("NFTLotteryPool");
  const Distributor = await ethers.getContractFactory("Distributor");
  const NFTLotteryPoolFactory = await ethers.getContractFactory(
    "NFTLotteryPoolFactory"
  );

  // const nft = await upgrades.deployProxy(NFT, [
  //   admin,
  //   "Non-Fungiable Token",
  //   "NFT",
  //   admin,
  //   250,
  // ]);
  // await nft.deployed();
  // const nftVerify = await upgrades.erc1967.getImplementationAddress(
  //   nft.address
  // );
  // console.log("nft deployed in:", nft.address);

  // const distributor = await Distributor.deploy(
  //   process.env.VRF_COORDINATOR,
  //   process.env.LINK,
  //   process.env.KEY_HASH
  // );
  // console.log("distributor deployed in:", distributor.address);

  // const nftLotteryPool = await NFTLotteryPool.deploy();
  // console.log("nftLotteryPool deployed in:", nftLotteryPool.address);

  const nftLotteryPoolFactory = await NFTLotteryPoolFactory.deploy(
    "0x2e529882887cEE17D335Dd771D42A4ee8bB24d74", // distributor.address,
    process.env.LINK,
    process.env.FEE,
    "0x569230D40C0a3B92074De0999FC54fd4BFc08ca8" // nftLotteryPool.address
  );
  console.log(
    "nftLotteryPoolFactory deployed in:",
    nftLotteryPoolFactory.address
  );

  // const contractAddresses = {
  //   admin: admin,
  //   nft: nft.address,
  //   distributor: distributor.address,
  //   nftLotteryPool: nftLotteryPool.address,
  //   nftLotteryPoolFactory: nftLotteryPoolFactory.address,
  // };

  // await fs.writeFileSync("contracts.json", JSON.stringify(contractAddresses));

  // const contractAddresses_verify = {
  //   admin: admin,
  //   nft: nftVerify,
  //   distributor: distributor.address,
  //   nftLotteryPool: nftLotteryPool.address,
  //   nftLotteryPoolFactory: nftLotteryPoolFactory.address,
  // };

  // await fs.writeFileSync(
  //   "contracts-verify.json",
  //   JSON.stringify(contractAddresses_verify)
  // );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
