const hre = require("hardhat");
const { ethers } = require("ethers");

async function main() {
    try {
        const account1 = "0xF977814e90dA44bFA03b6295A0616a897441aceC"; // Sender
        const account2 = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // Recipient

        const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // Goerli USDC

		const usdcAbi = [
			"function balanceOf(address account) view returns (uint256)",
			"function transfer(address recipient, uint256 amount) returns (bool)",
			"function approve(address spender, uint256 amount) returns (bool)",
		  ];        // 2. Get the USDC Contract Instance (Using a simplified ABI):
        const usdcContract = new ethers.Contract(usdcAddress, usdcAbi, hre.ethers.provider);

		console.log("Account 1 (before):", await usdcContract.balanceOf(account1));
		console.log("Account 2 (before):", await usdcContract.balanceOf(account2));
	
        await hre.network.provider.send("hardhat_impersonateAccount", [account1]);
        const signer = await hre.ethers.provider.getSigner(account1);
		
        const amountToSend = ethers.parseUnits("1", 6); // 6 decimals for Goerli USDC

        // 3. Approve the Transfer (Correct Way):
        const usdcWithSigner = usdcContract.connect(signer); // Connect with signer FIRST
        const approveTx = await usdcWithSigner.approve(usdcAddress, amountToSend);
        await approveTx.wait();

        // 4. Transfer the USDC (Correct Way):
        const transferTx = await usdcWithSigner.transfer(account2, amountToSend);
        await transferTx.wait();

		console.log("Account 1 (after):", await usdcContract.balanceOf(account1));
		console.log("Account 2 (after):", await usdcContract.balanceOf(account2));
	
    } catch (error) {
        console.error("Error in main:", error);
    }
}

main().catch((error) => {
    console.error("Top-level error:", error);
    process.exitCode = 1;
});
