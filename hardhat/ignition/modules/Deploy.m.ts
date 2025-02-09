// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const Deploy = buildModule("Deploy", (m) => {
  const vault = m.contract("VaultContract");
  const utils = m.contract("SwapContract", [vault], {
	after: [vault],
  })
  const etf = m.contract("C3ETFContract", [vault, utils], {
	after: [utils]
  })
  return { vault };
});

export default Deploy;