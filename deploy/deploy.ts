import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const DataWar = await deploy("DataWar", {
    from: deployer,
    log: true,
  });

  console.log(`DataWar contract: `, DataWar.address);
};
export default func;
func.id = "deploy_DataWar"; // id required to prevent reexecution
func.tags = ["DataWar"];
