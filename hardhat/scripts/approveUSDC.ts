const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {
  try {
    const account = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // Address 2

	//Swap
    const spender1 = "0x70e754531418461eF2366b72cd396337d2AD6D5d";

	//ETF
	const spender2 = "0xeF66010868Ff77119171628B7eFa0F6179779375"

    const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
	const usdcAbi = [
      "function approve(address spender, uint256 amount) returns (bool)",
    ];

    const usdcContract = new ethers.Contract(usdcAddress, usdcAbi, hre.ethers.provider);

    const amountToApprove = ethers.parseUnits("1000", 6); // Example: Approve 1000 USDC

	const signer = await hre.ethers.provider.getSigner(account);
	const usdcWithSigner = usdcContract.connect(signer); // Connect with signer FIRST

	const approveTx1 = await usdcWithSigner.approve(spender1, amountToApprove);
    await approveTx1.wait();

    console.log(`Account 1 (${account}) approved spender ${spender1} for ${ethers.formatUnits(amountToApprove, 6)} USDC`);

	const approveTx2 = await usdcWithSigner.approve(spender2, amountToApprove);
    await approveTx2.wait();
    console.log(`Account 2 (${account}) approved spender ${spender2} for ${ethers.formatUnits(amountToApprove, 6)} USDC`);

  } catch (error) {
    console.error("Error in main:", error);
  }
}

main().catch((error) => {
  console.error("Top-level error:", error);
  process.exitCode = 1;
});