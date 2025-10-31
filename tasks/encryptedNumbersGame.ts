import { FhevmType } from "@fhevm/hardhat-plugin";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

const resolveDeployment = async (hre: any, address?: string) => {
  if (address) {
    return { address };
  }

  return hre.deployments.get("EncryptedNumbersGame");
};

task("task:address", "Prints the EncryptedNumbersGame address").setAction(async function (
  _taskArguments: TaskArguments,
  hre,
) {
  const deployment = await resolveDeployment(hre);
  console.log(`EncryptedNumbersGame address is ${deployment.address}`);
});

task("task:join-game", "Join the encrypted numbers game")
  .addOptionalParam("address", "Optionally specify the contract address")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers } = hre;

    const deployment = await resolveDeployment(hre, taskArguments.address);
    console.log(`EncryptedNumbersGame: ${deployment.address}`);

    const signers = await ethers.getSigners();
    const contract = await ethers.getContractAt("EncryptedNumbersGame", deployment.address);

    const tx = await contract.connect(signers[0]).joinGame();
    console.log(`Wait for tx:${tx.hash}...`);
    const receipt = await tx.wait();
    console.log(`tx:${tx.hash} status=${receipt?.status}`);
  });

task("task:get-numbers", "Decrypt the encrypted numbers for a player")
  .addOptionalParam("address", "Optionally specify the contract address")
  .addOptionalParam("player", "Player address to inspect")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, fhevm } = hre;

    await fhevm.initializeCLIApi();

    const deployment = await resolveDeployment(hre, taskArguments.address);
    console.log(`EncryptedNumbersGame: ${deployment.address}`);

    const signers = await ethers.getSigners();
    const playerAddress = taskArguments.player ?? signers[0].address;

    const contract = await ethers.getContractAt("EncryptedNumbersGame", deployment.address);
    const encryptedNumbers = await contract.getEncryptedNumbers(playerAddress);

    console.log(`Encrypted numbers:`, encryptedNumbers);

    const decryptedNumbers: number[] = [];
    for (let i = 0; i < encryptedNumbers.length; i++) {
      const value = await fhevm.userDecryptEuint(
        FhevmType.euint32,
        encryptedNumbers[i],
        deployment.address,
        signers[0],
      );
      decryptedNumbers.push(Number(value));
    }

    console.log(`Decrypted numbers:`, decryptedNumbers);
  });

task("task:get-score", "Decrypt the encrypted score for a player")
  .addOptionalParam("address", "Optionally specify the contract address")
  .addOptionalParam("player", "Player address to inspect")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, fhevm } = hre;

    await fhevm.initializeCLIApi();

    const deployment = await resolveDeployment(hre, taskArguments.address);
    console.log(`EncryptedNumbersGame: ${deployment.address}`);

    const signers = await ethers.getSigners();
    const playerAddress = taskArguments.player ?? signers[0].address;

    const contract = await ethers.getContractAt("EncryptedNumbersGame", deployment.address);
    const encryptedScore = await contract.getEncryptedScore(playerAddress);

    console.log(`Encrypted score:`, encryptedScore);

    const decryptedScore = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      encryptedScore,
      deployment.address,
      signers[0],
    );

    console.log(`Decrypted score:`, decryptedScore.toString());
  });

task("task:claim-points", "Claim points using one of the encrypted numbers")
  .addOptionalParam("address", "Optionally specify the contract address")
  .addParam("index", "Number index to claim (0, 1, 2)")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const { ethers, fhevm } = hre;

    await fhevm.initializeCLIApi();

    const numberIndex = parseInt(taskArguments.index);
    if (![0, 1, 2].includes(numberIndex)) {
      throw new Error("--index must be 0, 1, or 2");
    }

    const deployment = await resolveDeployment(hre, taskArguments.address);
    console.log(`EncryptedNumbersGame: ${deployment.address}`);

    const signers = await ethers.getSigners();
    const contract = await ethers.getContractAt("EncryptedNumbersGame", deployment.address);

    const tx = await contract.connect(signers[0]).claimPoints(numberIndex);
    console.log(`Wait for tx:${tx.hash}...`);
    const receipt = await tx.wait();
    console.log(`tx:${tx.hash} status=${receipt?.status}`);

    const encryptedScore = await contract.getEncryptedScore(signers[0].address);
    const decryptedScore = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      encryptedScore,
      deployment.address,
      signers[0],
    );

    console.log(`New encrypted score: ${encryptedScore}`);
    console.log(`New decrypted score: ${decryptedScore}`);
  });
