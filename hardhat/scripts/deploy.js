// scripts/deploy.js
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Specify the contract address
  const vaultContract = await ethers.getContractFactory("Vault");
  const vault = await vaultContract.deploy();
  console.log("Vault contract deployed to:", vault.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
