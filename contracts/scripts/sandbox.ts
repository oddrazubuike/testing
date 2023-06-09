import { ethers } from "hardhat";
import { Profile__factory } from "../typechain-types";

async function main() {
  // Init account
  const accountWallet = new ethers.Wallet(
    process.env.PRIVATE_KEY_1 || "",
    ethers.provider
  );

  // Execute transaction
  const transaction = await Profile__factory.connect(
    "0x96E6AF6E9e400d0Cd6a4045F122df22BCaAAca59",
    accountWallet
  ).getURI(accountWallet.address);
  console.log("Transaction result:", transaction);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
